"use client";

import { updateConfig } from "@/api/config/config";
import { useToast } from "@/hooks/toast";
import { logger } from "@/logging/logger";
import { useAppStore } from "@/redux/hooks/AppStoreHooks";
import { commitAntiRaidConfig, resetAntiRaidConfig } from "@/redux/slice/AntiRaidConfigSlice";
import { AppStore } from "@/redux/store/AppStore";
import { unreachable } from "@/utils/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import EventEmitter from "events";
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";

type ConfigMutationContextType = {
    emitter: EventEmitter;
};

const defaultCallback = () => unreachable();

const ConfigMutationContext = createContext<ConfigMutationContextType>({
    emitter: new EventEmitter(),
});

export const ConfigMutationProvider: FC<PropsWithChildren> = ({ children }) => {
    const emitter = useMemo(() => new EventEmitter(), []);

    useEffect(() => {
        return () => logger.debug("ConfigMutationProvider", "component unmounted");
    }, []);

    return (
        <ConfigMutationContext.Provider
            value={{
                emitter,
            }}
        >
            {children}
        </ConfigMutationContext.Provider>
    );
};

const configMutationSlices: {
    [K in keyof ReturnType<AppStore["getState"]>]?: () => string;
} = {
    ruleModerationConfig: () => "rule_moderation",
};

const resetHandlers: {
    [K in keyof ReturnType<AppStore["getState"]>]?: () => PayloadAction;
} = {
    antiRaidConfig: () => resetAntiRaidConfig(),
};

const commitHandlers: {
    [K in keyof ReturnType<AppStore["getState"]>]?: () => PayloadAction;
} = {
    antiRaidConfig: () => commitAntiRaidConfig(),
};

export const useConfigMutationHandlers = () => {
    const { emitter } = useContext(ConfigMutationContext);
    const updateQueueTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const lastToastIdRef = useRef<string>();
    const store = useAppStore();
    const { addToast, removeToast } = useToast();

    const doReset = useCallback(() => {
        for (const slice in resetHandlers) {
            const action = resetHandlers[slice as keyof typeof resetHandlers]?.();

            if (action) {
                store.dispatch(action);
            }
        }
    }, [store]);

    const doCommit = useCallback(() => {
        for (const slice in commitHandlers) {
            const action = commitHandlers[slice as keyof typeof commitHandlers]?.();

            if (action) {
                store.dispatch(action);
            }
        }
    }, [store]);

    const queueUpdate = useCallback(() => {
        if (updateQueueTimeoutRef.current) {
            clearTimeout(updateQueueTimeoutRef.current);
        }

        updateQueueTimeoutRef.current = setTimeout(() => {
            updateQueueTimeoutRef.current = undefined;
            emitter.emit("push");
            const state = store.getState();
            const payload: Record<string, unknown> = {};

            for (const slice in configMutationSlices) {
                const config = state[slice as keyof typeof state];

                if (!config || !("data" in config)) {
                    continue;
                }

                const key = configMutationSlices[slice as keyof typeof configMutationSlices]?.();

                if (!key) {
                    continue;
                }

                payload[key] = config.data;
            }

            if (!state.user.currentGuildId) {
                throw new Error("No current guild ID is set!");
            }

            updateConfig(state.user.currentGuildId, payload)
                .then((success) => {
                    if (!success) {
                        throw new Error("Failed to update configuration");
                    }

                    emitter.emit("push::success");
                    emitter.removeAllListeners("reset::untilSave");
                    emitter.emit("save");
                    doCommit();
                })
                .catch((error: unknown) => {
                    emitter.emit("push::error");
                    emitter.emit("reset");
                    emitter.emit("reset::untilSave");
                    doReset();
                    logger.error("useConfigMutationHandlers", "Failed to update configuration", error);

                    if (lastToastIdRef.current) {
                        removeToast(lastToastIdRef.current);
                    }

                    lastToastIdRef.current = addToast({
                        title: "Configuration Update",
                        contents: "Failed to update configuration due to a network request error.",
                        icon: "MdError",
                        closeIn: 10_000,
                    });
                });
        }, 500);
    }, [emitter, store]);

    return { emitter, queueUpdate, doReset, doCommit };
};

export default ConfigMutationContext;
