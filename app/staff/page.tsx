"use client";

import { Image } from "@heroui/image";
import { motion } from "framer-motion";

export default function SplitImage() {
  const imageUrl = "/images/sehaj.jpg";

  return (
    <div className="relative w-full h-screen overflow-hidden">

      <motion.div
        initial={{ y: "150%" ,opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-left">
          <Image src={imageUrl} alt="Left Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "-125%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: "easeInOut" ,delay: 1.1 }}
        className="absolute top-0 left-33% w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-middle">
          <Image src={imageUrl} alt="Middle Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "150%" }}
        animate={{ y: "0%"}}
        transition={{ duration: 1.1, ease: "easeInOut" , delay: 2.2}}
        className="absolute top-0 left-66% w-1/3 h-4/5 overflow-hidden "
      >
        <div className="absolute inset-0 clip-right">
          <Image src={imageUrl} alt="Right Third" style={{ objectFit: "cover" }}/>
        </div>
      </motion.div>

    </div>
  );
}
