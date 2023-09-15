import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

const FormLoading: FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="md:absolute top-0 left-0 bg-[rgba(255,255,255,0.2)] h-[100%] w-[100%] z-[1000]"
                    initial={{ opacity: 0.001 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{
                        duration: 0.2,
                        bounce: 1,
                    }}
                ></motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormLoading;
