"use client";

import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

export default function SplitImage() {
  const imageUrl = "/images/image.png";
  const about = "Gabriel is a senior Computer Science student and Audio Visual Technician at Adelphi University. " +
        "As part of his role, he manages classroom technology systems across campus, working with a dedicated IT team and external vendors to keep systems running seamlessly. " +
        "Gabriel also provides training for professors and academic professionals, helping them integrate technology confidently into their teaching" +
        "Beyond his AV expertise, Gabriel brings extensive experience in Level 1 and Level 2 IT services. \n He has collaborated with high-profile corporate clients, delivering IT solutions that meet enterprise standards of performance and security. " +
        "Exposure to network engineering and cybersecurity further strengthens his ability to approach projects with technical depth and a security-first mindset" + "Recognized for his professionalism, Gabriel works directly with clients to ensure their needs are understood and their satisfaction is achieved. " +
        "His commitment to reliable, high-quality service makes him a trusted partner for both academic institutions and businesses";
        return (
    <div className="relative w-full h-screen overflow-hidden">

      <motion.div
        initial={{ y: "150%" ,opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: -0.5 }}
        className="absolute top-30 left-15 w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-left">
          <Image src={imageUrl} alt="Left Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "-125%", opacity: 0 }}
        animate={{ y: "0%" , opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" ,delay: 0 }}
        className="absolute top-30 left-15 w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-middle">
          <Image src={imageUrl} alt="Middle Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "150%" , opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" , delay: 0.4}}
        className="absolute top-30 left-15 w-1/3 h-4/5 overflow-hidden "
      >
        <div className="absolute inset-0 clip-right">
          <Image src={imageUrl} alt="Right Third" style={{ objectFit: "cover" }}/>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-end p-15">
        <Card
          radius="lg"
          shadow="lg"
          className="right-20 max-w-2xl bg-content1/70 backdrop-blur-xl border light:border-black/10 dark:border-white/10"
        >
          <CardBody className="p-8">
            <h2 className="text-3xl font-semibold mb-4">About Gabe</h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {about}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>

    
  );
}
