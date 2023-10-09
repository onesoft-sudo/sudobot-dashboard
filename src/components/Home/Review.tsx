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

import type { APIReview } from "@/types/APIReview";
import { Progress } from "@nextui-org/react";
import { FC } from "react";
import styles from '../../styles/Review.module.css';

interface ReviewProps {
    review: APIReview;
}

const Review: FC<ReviewProps> = ({ review }) => {
    return (
        <div className={`p-2 text-center w-[100%] block h-[200px] max-h-[200px] overflow-y-scroll ${styles.review}`}>
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
                <blockquote className="text-[#999] text-center">
                    &ldquo;{review.content.trim().split('\n').map((str, index, array) => <>{str}{array.length - 1 > index && <br />}</>)}&rdquo;
                </blockquote>
            </div>
        </div>
    );
};

export default Review;
