import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function UnsavedNotification({ onSubmit, onDiscard, show = true }: { onSubmit: (e: MouseEvent) => any, onDiscard: (e: MouseEvent) => any, show: boolean }) {
    const [bottom, setBottom] = useState('-100px');

    useEffect(() => setBottom(show ? '15px' : '-100px'), [show]);

    return (
        <div className="m-4 p-4 md:p-2 md:pl-3 z-10 bg-[#000] rounded fixed left-4 md:flex items-center justify-between" style={{
            border: '1px solid #777',
            bottom: bottom ?? '-100px',
            transition: '0.4s'
        }}>
            <p>There are unsaved changes!</p>

            <div className="flex items-center md:pl-5 justify-center md:justify-start pt-3 md:pt-0">
                <Button onClick={onDiscard as any}>Discard</Button>
                <Button onClick={e => {
                    onSubmit(e as any);
                    setBottom('-100px');
                }}>Save</Button>
            </div>
        </div>
    );
}