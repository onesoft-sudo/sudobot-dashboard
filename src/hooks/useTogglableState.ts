import { useState } from "react";

export default function useTogglableState(
    defaultValue: boolean | (() => boolean) = false
): [boolean, (value?: boolean | ((prevState: boolean) => boolean)) => void] {
    const [state, setState] = useState(defaultValue);
    const toggle = (value?: boolean | ((prevState: boolean) => boolean)) => {
        setState(value !== undefined ? value : s => !s);
    };

    return [state, toggle];
}
