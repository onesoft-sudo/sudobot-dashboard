"use client";

import { logger } from "@/logging/logger";
import { unreachable } from "@/utils/utils";
import EventEmitter from "events";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo } from "react";

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

export const useConfigMutationHandlers = () => {
    return useContext(ConfigMutationContext);
};

export default ConfigMutationContext;
