import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import {
    commitRuleModerationConfig,
    resetRuleModerationConfig,
    updateRuleModerationConfig,
} from "@/redux/slice/RuleModerationConfigSlice";
import { setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { useCallback, useEffect, useRef } from "react";

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
