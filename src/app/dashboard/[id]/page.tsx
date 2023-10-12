/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

import { getAnnouncements } from "@/api/routes/announcements";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import Welcome from "@/components/Dashboard/Welcome";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Dashboard - SudoBot",
};

const Dashboard: FC = async () => {
    let announcements = [];

    try {
        const response = await getAnnouncements();
        announcements = response.data?.announcements;
    } catch (e) {}

    return (
        <main className="min-h-[90vh]">
            <Welcome />

            <br />
            <br />

            <DashboardCards announcements={announcements} />
        </main>
    );
};

export default Dashboard;
