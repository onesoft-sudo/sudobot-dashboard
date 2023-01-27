import Head from "next/head";
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, Button, TextField, FormHelperText } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { applyForm } from "../../utils/links";
import { formatDistanceToNow } from "date-fns";
import PackageMeta from '../../../package.json';
import { useForm } from 'react-hook-form';
import Routes from "../../utils/Routes";
import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthCheck from "../../hooks/useAuthCheck";

export default function Dashboard() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const ref = useRef({} as HTMLCanvasElement);
    const [message, setMessage] = useState<string | null>(null);

    useAuthCheck();
    
    useEffect(() => {
        const chart = new Chart(ref.current, {
            type: 'bar',
            data: {
                labels: ['Ban', 'Kick', 'Mute', 'Hardmute', 'Tempban', 'Shot', 'Unban', 'Unmute'],
                datasets: [
                    {
                        label: 'Number of Infractions',
                        data: [21, 0, 4, 1, 0, 7, 1, 12],
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

    function onSubmit(fields: { content?: string }) {
        fetch(Routes.contact(), { 
            method: 'POST',
            body: JSON.stringify({ content: fields.content }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            
            if (json.success) {
                setMessage("Message has been sent!");
                setTimeout(() => setMessage(null), 5000);
            }
        })
        .catch(console.error);
    }

    return (
        <div className="p-2 min-h-[80vh]">
            <Head>
                <title>Dashboard - SudoBot</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <h1>Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-5">
                <Card>
                    <CardContent>
                        <h2 className="mb-2">Welcome back</h2>
                        <p>Couldn't find what you're looking for? Contact support at <a href="mailto:support@onesoftnet.eu.org">support@onesoftnet.eu.org</a>.</p>

                        <br />

                        <h3 className="mb-2 flex items-center justify-between">
                            <span>Servers</span>
                            <Button target="_blank" rel="noreferrer" href={applyForm} startIcon={<MdAdd />}>Add</Button>
                        </h3>

                        <p>SudoBot is installed in the following servers:</p>

                        <ul className="pl-4 pt-2">
                            {["The Everything Server", "TES Bot Workshop"].map(s => <li key={s}>{s}</li>)}
                        </ul>

                        <br />

                        <h3 className="mb-2">System Information</h3>
                        <p className="leading-[3ch]">
                            Bot Version: <code className="p-[2px] bg-slate-700 rounded">v4.17.2</code><br />
                            Dashboard Version: <code className="p-[2px] bg-slate-700 rounded">v{PackageMeta.version}</code><br />
                            Uptime: <code className="p-[2px] bg-slate-700 rounded">{formatDistanceToNow(new Date("2022-11-01T11:59:00Z"))}</code>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2 className="mb-2">Recent Infractions</h2>
                        <canvas ref={ref} width="500px" height="300px"></canvas>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card>
                    <CardContent>
                        <h2 className="mb-5">Contact Support via Form</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth={true}
                                multiline={true}
                                minRows={3}
                                label="Your feedback or problem report"
                                {...register("content", { 
                                    required: { value: true, message: "This field is required!" }, 
                                    maxLength: { value: 3000, message: "Your message must not contain more than 3000 characters!" } 
                                })}
                            />

                            {errors.content?.message && <FormHelperText className="text-red-500">{errors.content.message.toString()}</FormHelperText>}
                            {message && <FormHelperText className="text-blue-500">{message}</FormHelperText>}

                            <Button className="float-right my-5" type="submit" variant="outlined">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

Dashboard.layout = DashboardLayout;