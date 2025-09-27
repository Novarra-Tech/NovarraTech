"use client";

import { motion } from "framer-motion";

export const Loading= () => {

    return (
        <div className="relative w-full h-screen overflow-hidden">

            <motion.div
                initial={{ y: "150%" }}
                animate={{ y: "0%" }}
                transition={{ duration: .75, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-1/3 h-4/5 overflow-hidden"
            >
                <div className="absolute inset-0 clip-left bg-loading">
                    Loading
                </div>
            </motion.div>

            <motion.div
                initial={{ y: "-125%" }}
                animate={{ y: "0%" }}
                transition={{ duration: .75, ease: "easeInOut" ,delay: .75 }}
                className="absolute top-0 left-33% w-1/3 h-4/5 overflow-hidden"
            >
                <div className="absolute inset-0 clip-middle">

                </div>
            </motion.div>

            <motion.div
                initial={{ y: "150%" }}
                animate={{ y: "0%"}}
                transition={{ duration: .75, ease: "easeInOut" , delay: 1.5}}
                className="absolute top-0 left-66% w-1/3 h-4/5 overflow-hidden "
            >
                <div className="absolute inset-0 clip-right">
                </div>
            </motion.div>

        </div>
    );
}
