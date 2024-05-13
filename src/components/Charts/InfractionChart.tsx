"use client";

import { useTheme } from "@/hooks/theme";
import { Line } from "react-chartjs-2";

// TODO: This component contains dummy data and should be replaced with real data.
export default function InfractionChart() {
    const isDark = useTheme().mode === "dark";
    const labels = [];

    for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        const hours = date.getHours() % 12 || 12;
        labels.unshift(`${hours} ${date.getHours() >= 12 ? "PM" : "AM"}`);
    }

    return (
        <Line
            data={{
                datasets: [
                    {
                        data: [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        label: "Infractions",
                    },
                ],
                labels,
            }}
            options={{
                scales: {
                    x: {
                        grid: {
                            color: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.09)",
                        },
                        ticks: {
                            color: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)",
                        },
                    },
                    y: {
                        grid: {
                            color: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.09)",
                        },
                        ticks: {
                            color: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
                        },
                    },
                },
            }}
        />
    );
}
