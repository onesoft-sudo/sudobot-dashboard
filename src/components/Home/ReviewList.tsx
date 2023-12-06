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

"use client";

import { getReviews } from "@/api/routes/reviews";
import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import ReviewCreateForm from "./ReviewCreateForm";
import Reviews from "./Reviews";

const ReviewList: FC = () => {
    const query = useQuery({
        queryKey: ["reviews"],
        queryFn: getReviews,
    });

    console.log(query.data?.data);

    return (
        <div className="px-3">
            <h1 className="text-3xl md:text-4xl text-center pb-4">
                Community Reviews
            </h1>

            <div
                style={{
                    height: 2,
                    width: 50,
                    background: "#007bff",
                }}
                className="mx-auto mb-2"
            ></div>

            <br className="hidden md:block" />
            <br />
            <div className="flex justify-center pt-3">
                {query.isSuccess &&
                    (!query.data?.data || query.data?.data?.length === 0 ? (
                        <div>No reviews yet.</div>
                    ) : (
                        <Reviews reviews={query.data?.data ?? []} />
                    ))}

                {query.isLoading && (
                    <div className="h-[10px] w-[100%] md:w-[350px] block">
                        <LinearProgress />
                        <br />
                    </div>
                )}
            </div>
            <div className="flex justify-center pt-5 pb-[45px]">
                {query.isSuccess && <ReviewCreateForm />}
            </div>
        </div>
    );
};

export default ReviewList;
