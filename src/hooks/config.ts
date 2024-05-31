import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import {
    commitRuleModerationConfig,
    resetRuleModerationConfig,
    updateRuleModerationConfig,
} from "@/redux/slice/RuleModerationConfigSlice";
import { setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { RootState } from "@/redux/store/AppStore";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
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
