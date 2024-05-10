import ClientSideDashboardPart from "./ClientSideDashboardPart";

export default function Dashboard() {
    return (
        <div>
            <h1 className="p-3 text-3xl xl:text-4xl">Dashboard</h1>

            <ClientSideDashboardPart />
        </div>
    );
}
