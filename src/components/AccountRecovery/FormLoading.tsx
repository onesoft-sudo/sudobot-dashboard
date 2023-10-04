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
