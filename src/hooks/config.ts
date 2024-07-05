import { updateConfig } from "@/api/config/config";
import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useGuildConfiguration } from "@/contexts/GuildConfigurationContext";
import { logger } from "@/logging/logger";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import {
    commitRuleModerationConfig,
    resetRuleModerationConfig,
    updateRuleModerationConfig,
} from "@/redux/slice/RuleModerationConfigSlice";
import { setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { RootState } from "@/redux/store/AppStore";
import { GuildConfiguration } from "@/types/GuildConfiguration";
import { isDevMode } from "@/utils/utils";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useQueryClient } from "@tanstack/react-query";
import * as dot from "dot-object";
import { useCallback, useEffect, useRef } from "react";
import { useToast } from "./toast";
import { useCurrentUserInfo } from "./user";

export const useRuleModerationConfigUpdate = () => {
    const hasChanges = useAppSelector((state) => state.unsavedChanges.hasChanges);
    const dispatch = useAppDispatch();
    const { emitter } = useConfigMutationHandlers();
    const ref = useRef<Record<number, () => void>>({});

    useEffect(() => {
        const current = ref.current;

        return () => {
            for (const id in current) {
                emitter.off("save", current[id]);
            }
        };
    }, [emitter]);

    const setHasUnsavedChanges = useCallback(() => {
        if (!hasChanges) {
            dispatch(
                setUnsavedChanges({
                    hasChanges: true,
                }),
            );
        }
    }, [dispatch, hasChanges]);

    const update = useCallback(
        (data: Parameters<typeof updateRuleModerationConfig>[0]) => {
            dispatch(updateRuleModerationConfig(data));
        },
        [dispatch],
    );

    const reset = useCallback(() => {
        dispatch(resetRuleModerationConfig());
    }, [dispatch]);

    const commit = useCallback(() => {
        dispatch(commitRuleModerationConfig());
    }, [dispatch]);

    const queueUpdate = useCallback(
        (queueId: number, data: Parameters<typeof updateRuleModerationConfig>[0]) => {
            if (ref.current[queueId]) {
                emitter.off("save", ref.current[queueId]);
            }

            ref.current[queueId] = () => {
                update(data);
            };

            emitter.once("save", ref.current[queueId]);
            setHasUnsavedChanges();
        },
        [emitter, setHasUnsavedChanges, update],
    );

    return { reset, update, queueUpdate, setHasUnsavedChanges, commit };
};

type FilteredSliceKeysWithData = {
    [K in keyof RootState]: RootState[K] extends { data: any } ? K : never;
}[keyof RootState];

export const useConfig = <K extends FilteredSliceKeysWithData>(key: K) => {
    return useAppSelector((state) => state[key]["data"]) as RootState[K]["data"];
};

export const useConfigUpdate = <K extends FilteredSliceKeysWithData>(
    state: RootState[K]["data"],
    action: ActionCreatorWithPayload<Partial<RootState[NoInfer<K>]["data"]>>,
    onReset?: () => void,
) => {
    const hasUnsavedChanges = useAppSelector((state) => state.unsavedChanges.hasChanges);
    const { emitter } = useConfigMutationHandlers();
    const dispatch = useAppDispatch();
    const update = useCallback(
        (data: Partial<RootState[K]["data"]>) => {
            dispatch(action(data));

            if (!hasUnsavedChanges) {
                dispatch(setUnsavedChanges({ hasChanges: true }));
            }
        },
        [dispatch, hasUnsavedChanges], // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        if (!onReset) {
            return;
        }

        emitter.on("reset", onReset);

        return () => {
            emitter.off("reset", onReset);
        };
    }, [emitter, onReset]);

    return { state, update, hasUnsavedChanges };
};

export const useGuildConfigurationUpdate = (reset?: () => void) => {
    const { currentGuildId } = useCurrentUserInfo();
    const config = useGuildConfiguration();
    const queryClient = useQueryClient();
    const { addToast, removeToast } = useToast();

    const update = useCallback(
        async (newConfig: Partial<GuildConfiguration>) => {
            if (!currentGuildId) {
                return;
            }

            logger.debug("useGuildConfigurationUpdate", "Updating guild configuration", newConfig);

            const id = addToast({
                contents: "Saving configuration changes...",
                title: "Saving Changes",
                progress: true,
                icon: "MdSource",
            });

            try {
                const result = await updateConfig(
                    currentGuildId,
                    dot.object({
                        ...config,
                        ...newConfig,
                    }) as Record<string, unknown>,
                );

                if (!result) {
                    throw new Error("Failed to update configuration");
                }

                if (isDevMode()) {
                    await new Promise((resolve) => setTimeout(resolve, 2500));
                }

                queryClient.invalidateQueries({
                    queryKey: ["guildConfiguration", currentGuildId],
                });

                window.dispatchEvent(new CustomEvent("sb:guild-config-save"));
                removeToast(id);
                return true;
            } catch (error) {
                reset?.();
                logger.error("useGuildConfigurationUpdate", "Failed to update guild configuration", error);
                removeToast(id);
            }

            return false;
        },
        [currentGuildId, queryClient, config, addToast, removeToast, reset],
    );

    return update;
};
