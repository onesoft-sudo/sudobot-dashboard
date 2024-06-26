"use client";

import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { Button } from "@mui/material";
import clsx from "clsx";
import { MdWarning } from "react-icons/md";

export default function UnsavedChangesAlert() {
    const state = useAppSelector((state) => state.unsavedChanges.hasChanges);
    const dispatch = useAppDispatch();
    const { emitter, queueUpdate, doReset } = useConfigMutationHandlers();

    return (
        <div
            className={clsx("fixed z-[1000000] w-full px-5 py-3 [transition:1s_ease] lg:w-[32rem]", {
                "bottom-2": state,
                "bottom-[-100%]": !state,
            })}
        >
            <div className="flex items-center justify-between rounded-md bg-zinc-300 py-2 pl-4 pr-3 dark:bg-[rgb(35,35,35)]">
                <p className="flex items-center gap-2">
                    <MdWarning size="1.3rem" className="text-yellow-500" /> You have unsaved changes.
                </p>

                <div className="flex items-center gap-1">
                    <Button
                        onClick={() => {
                            emitter.emit("reset");
                            emitter.emit("reset::untilSave");
                            doReset();
                            dispatch(setUnsavedChanges({ hasChanges: false }));
                        }}
                        color="warning"
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(setUnsavedChanges({ hasChanges: false }));
                            queueUpdate();
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
