import InfractionChart from "@/components/Charts/InfractionChart";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { MdGavel } from "react-icons/md";

export default function InfractionStatisticsCard() {
    return (
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
                <p className="text-small text-default-500">Showing the number of infractions over the past 12 hours.</p>
            </CardFooter>
        </Card>
    );
}
