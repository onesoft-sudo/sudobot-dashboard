import type { APIReview } from "@/types/APIReview";
import { Progress } from "@nextui-org/react";
import { FC } from "react";

interface ReviewProps {
    review: APIReview;
}

const Review: FC<ReviewProps> = ({ review }) => {
    return (
        <div className="p-2 text-center w-[100%] block">
            <h3 className="font-bold text-xl lg:text-2xl">
                {review.reviewer ?? "Anonymous"}
            </h3>
            {review.aboutReviewer && (
                <h5 className="text-[#999] text-lg lg:text-xl">
                    {review.aboutReviewer}
                </h5>
            )}
            <div className="pt-3 px-3">
                <Progress
                    size="md"
                    radius="md"
                    classNames={{
                        track: "drop-shadow-md border border-default",
                        indicator:
                            "bg-gradient-to-r from-green-500 to-blue-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                    }}
                    label="Rating"
                    value={(review.rating / 5) * 100}
                    showValueLabel={true}
                    valueLabel={`${review.rating}/5`}
                />
            </div>
            <div className="pt-3">
                <blockquote className=" text-[#999] text-center">
                    &ldquo;{review.content}&rdquo;
                </blockquote>
            </div>
        </div>
    );
};

export default Review;
