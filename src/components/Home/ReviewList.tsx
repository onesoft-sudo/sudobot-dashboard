"use client";

import { getReviews } from "@/api/reviews";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
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
            <div className="flex justify-center pt-3 pb-[45px]">
                {query.isSuccess && (
                    <Reviews reviews={query.data?.data ?? []} />
                )}
            </div>
        </div>
    );
};

export default ReviewList;
