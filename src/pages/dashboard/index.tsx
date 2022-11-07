import Head from "next/head";
import Chart from 'chart.js/auto';
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@mui/material";

export default function Dashboard() {
    const ref = useRef({} as HTMLCanvasElement);
    
    useEffect(() => {
        const chart = new Chart(ref.current, {
            type: 'bar',
            data: {
                labels: ['Ban', 'Kick', 'Mute', 'Hardmute', 'Tempban', 'Shot'],
                datasets: [
                    {
                        label: 'Number of Infractions',
                        data: [21, 0, 4, 1, 0, 7],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => chart.destroy();
    }, []);

    return (
        <div className="p-2 md:px-[20%] min-h-[80vh]">
            <Head>
                <title>Dashboard - SudoBot</title>
                <meta name="robots" content="noindex" />
            </Head>

            <h1>Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-5">
                <Card>
                    <CardContent>
                        <h2 className="mb-2">Welcome back</h2>
                        <p>Couldn't find what you're looking for? Contact support at <a href="mailto:support@onesoftnet.eu.org">support@onesoftnet.eu.org</a>.</p>

                        <br />

                        <h3></h3>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2 className="mb-2">Recent Infractions</h2>
                        <canvas ref={ref} width="500px" height="300px"></canvas>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}