"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { runSaveHandlers, setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { Button } from "@mui/material";
import clsx from "clsx";
import { MdWarning } from "react-icons/md";

export default function UnsavedChangesAlert() {
    const state = useAppSelector((state) => state.unsavedChanges.hasChanges);
    const dispatch = useAppDispatch();

    return (
        <div
            className={clsx("fixed z-[1000000] w-full px-5 py-3 [transition:1s_ease] lg:w-[30rem]", {
                "bottom-2": state,
                "bottom-[-100%]": !state,
            })}
        >
            <div className="flex items-center justify-between rounded-md bg-zinc-300 py-2 pl-4 pr-3 dark:bg-[rgb(45,45,45)]">
                <p className="flex items-center gap-2">
                    <MdWarning size="1.3rem" /> You have unsaved changes.
                </p>
                <Button
                    onClick={() => {
                        runSaveHandlers();
                        dispatch(setUnsavedChanges({ hasChanges: false }));
                    }}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
