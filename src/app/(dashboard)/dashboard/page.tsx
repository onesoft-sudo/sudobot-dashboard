import ChartJSInitializer from "@/components/Charts/ChartJSInitializer";
import InfractionChart from "@/components/Charts/InfractionChart";
import WelcomeHeading from "@/components/Dashboard/WelcomeHeading";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { MdGavel } from "react-icons/md";

export default function Dashboard() {
    return (
        <div className="my-4">
            <WelcomeHeading />
            <ChartJSInitializer />

            <div className="mt-7 grid grid-cols-1 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Card className="md:col-span-2" shadow="sm">
                    <CardHeader className="flex gap-3">
                        <MdGavel size="2rem" />
                        <div className="flex flex-col">
                            <p className="text-base">Infraction Statistics</p>
                            <p className="text-small text-default-500">Updated 1 minute ago</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <InfractionChart />
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <p className="text-small text-default-500">
                            Showing the number of infractions over the past 12 hours.
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
