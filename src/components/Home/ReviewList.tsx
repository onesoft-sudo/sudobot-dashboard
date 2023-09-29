"use client";

import { getReviews } from "@/api/reviews";
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
                {query.isSuccess && (
                    <Reviews reviews={query.data?.data ?? []} />
                )}

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
