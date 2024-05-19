import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import {
    commitRuleModerationConfig,
    resetRuleModerationConfig,
    updateRuleModerationConfig,
} from "@/redux/slice/RuleModerationConfigSlice";
import { setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { useEffect, useRef } from "react";

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
    }, []);

    const setHasUnsavedChanges = () => {
        if (!hasChanges) {
            dispatch(
                setUnsavedChanges({
                    hasChanges: true,
                }),
            );
        }
    };

    const update = (data: Parameters<typeof updateRuleModerationConfig>[0]) => {
        dispatch(updateRuleModerationConfig(data));
    };

    const reset = () => {
        dispatch(resetRuleModerationConfig());
    };

    const commit = () => {
        dispatch(commitRuleModerationConfig());
    };

    const queueUpdate = (queueId: number, data: Parameters<typeof updateRuleModerationConfig>[0]) => {
        if (ref.current[queueId]) {
            emitter.off("save", ref.current[queueId]);
        }

        ref.current[queueId] = () => {
            update(data);
            console.log("save");
        };

        emitter.once("save", ref.current[queueId]);
        setHasUnsavedChanges();
    };

    return { reset, update, queueUpdate, setHasUnsavedChanges, commit };
};
