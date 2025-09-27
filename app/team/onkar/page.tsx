"use client";

import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

export default function SplitImage() {
  const imageUrl = "/images/image.png";
  const about = "Onkar is a senior Computer Science student with deep expertise in programming and cybersecurity. " +
        "Skilled in multiple programming languages and experienced in research-driven projects, he brings a forward-thinking approach to technology solutions" + "He also leads a Help Desk team of IT service specialists within the Adelphi domain, where they monitor and assist over 100,000 users. " +
        "Through this leadership, Onkar ensures that organizations receive reliable support, consistent service standards, and an exceptional customer experience" +
        "By combining technical knowledge with hands-on leadership, Onkar helps clients achieve technology goals with efficiency, security, and confidence";
        return (
    <div className="relative w-full h-screen overflow-hidden">

      <motion.div
        initial={{ y: "150%" ,opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: -0.5 }}
        className="absolute top-25 left-25 w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-left">
          <Image src={imageUrl} alt="Left Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "-125%", opacity: 0 }}
        animate={{ y: "0%" , opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" ,delay: 0 }}
        className="absolute top-25 left-25 w-1/3 h-4/5 overflow-hidden "
      >
        <div className="absolute inset-0 clip-middle">
          <Image src={imageUrl} alt="Middle Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "150%" , opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" , delay: 0.4}}
        className="absolute top-25 left-25 w-1/3 h-4/5 overflow-hidden "
      >
        <div className="absolute inset-0 clip-right">
          <Image src={imageUrl} alt="Right Third" style={{ objectFit: "cover" }}/>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-end p-15">
        <Card
          radius="lg"
          shadow="lg"
          className="right-30 max-w-lg bg-content1/70 backdrop-blur-xl border light:border-black/10 dark:border-white/10"
        >
          <CardBody className="p-8">
            <h2 className="text-3xl font-semibold mb-4">About Onkar</h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {about}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>

    
  );
}
