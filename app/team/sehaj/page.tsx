"use client";

import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

export default function SplitImage() {
  const imageUrl = "/images/sehaj.jpg";
  const about = "Sehaj is a senior Computer Science student with expertise in programming and cybersecurity. " +
        "He has hands-on experience as a full stack developer at a tech startup that integrates real estate and AI, giving him valuable insight into building modern, innovative applications." + "In addition to his development work, Sehaj is an Audio Visual Technician at Adelphi University, where he helps monitor and maintain classroom technology across campus. " +
        "His dual background in software development and AV systems allows him to approach challenges with both technical depth and practical problem-solving skills. " +
        "Sehaj's mix of programming expertise, cybersecurity knowledge, and real-world AV support experience makes him a versatile team member dedicated to delivering technology solutions that are secure, reliable, and user-friendly.";

        return (
    <div className="relative w-full h-screen overflow-hidden">

      <motion.div
        initial={{ y: "150%" ,opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: -0.5 }}
        className="absolute top-15 left-15 w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-left">
          <Image src={imageUrl} alt="Left Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "-125%", opacity: 0 }}
        animate={{ y: "0%" , opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" ,delay: 0 }}
        className="absolute top-15 left-15 w-1/3 h-4/5 overflow-hidden"
      >
        <div className="absolute inset-0 clip-middle">
          <Image src={imageUrl} alt="Middle Third" style={{ objectFit: "cover" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "150%" , opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" , delay: 0.4}}
        className="absolute top-15 left-15 w-1/3 h-4/5 overflow-hidden "
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
            <h2 className="text-3xl font-semibold mb-4">About Sehaj</h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {about}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>

    
  );
}
