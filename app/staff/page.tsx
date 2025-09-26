"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SplitImage() {
    const imageUrl = "/images/sehaj.jpg";

    return (
        <div className="relative w-full h-screen flex  overflow-hidden">

            {/* Right Half slides in first */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
                className="relative w-1/2 h-full overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src={imageUrl}
                        alt="Right Half"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="-1500%" // your custom position
                    />
                </div>
            </motion.div>

            {/* Left Half slides in second */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-1/2 h-full overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src={imageUrl}
                        alt="Left Half"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="1409%" // your custom position
                    />
                </div>
            </motion.div>

        </div>
    );
}
