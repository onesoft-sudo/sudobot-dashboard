import EnsureAuthenticated from "@/components/Auth/EnsureAuthenticated";
import AccountInfoCard from "@/components/Dashboard/Account/AccountInfoCard";
import DevicesListCard from "@/components/Dashboard/Account/DevicesListCard";
import Heading from "@/components/Dashboard/Heading";

export default function Page() {
    return (
        <div>
            <Heading>Account Settings</Heading>
            <EnsureAuthenticated />
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <AccountInfoCard />
                <DevicesListCard />
            </div>
        </div>
    );
}
