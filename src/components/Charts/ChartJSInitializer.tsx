"use client";

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect } from "react";

declare module globalThis {
    let chartJSInitialized: boolean;
}

export default function ChartJSInitializer() {
    useEffect(() => {
        if (globalThis.chartJSInitialized) {
            return;
        }

        globalThis.chartJSInitialized = true;
        ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    }, []);

    return null;
}
