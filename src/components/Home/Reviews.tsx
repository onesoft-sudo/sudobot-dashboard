import useIsDesktop from "@/hooks/useIsDesktop";
import { APIReview } from "@/types/APIReview";
import { Box, Button, MobileStepper, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Review from "./Review";

interface ReviewsProps {
    reviews: APIReview[];
}

const Reviews: FC<ReviewsProps> = ({ reviews }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [direction, setDirection] = useState("left");
    const isDesktop = useIsDesktop();

    const maxSteps = reviews.length;

    const handleNext = () => {
        setDirection("left");
        setActiveStep(prevActiveStep =>
            prevActiveStep + 1 === maxSteps ? 0 : prevActiveStep + 1
        );
    };

    const handleBack = () => {
        setDirection("right");
        setActiveStep(prevActiveStep =>
            prevActiveStep - 1 < 0 ? maxSteps - 1 : prevActiveStep - 1
        );
    };

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            display: "block",
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            opacity: 0,
            display: "none",
            transition: {
                duration: 0,
            },
        },
    };

    return (
        <Box
            sx={{
                maxWidth: isDesktop ? 600 : "100%",
                flexGrow: 1,
                overflow: "hidden",
                backgroundColor: "rgb(22, 22, 22)",
                paddingTop: "10px",
                borderRadius: "10px",
            }}
        >
            <AnimatePresence>
                <motion.div
                    key={activeStep}
                    variants={slideVariants}
                    initial={
                        direction === "right" ? "hiddenRight" : "hiddenLeft"
                    }
                    animate="visible"
                    exit="exit"
                >
                    <Review review={reviews[activeStep]} />
                </motion.div>
            </AnimatePresence>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                style={{
                    backgroundColor: "#222",
                }}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === "rtl" ? (
                            <MdKeyboardArrowLeft />
                        ) : (
                            <MdKeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {theme.direction === "rtl" ? (
                            <MdKeyboardArrowRight />
                        ) : (
                            <MdKeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
};

export default Reviews;
