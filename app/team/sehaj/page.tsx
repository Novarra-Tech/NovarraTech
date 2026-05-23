"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MEMBER = {
    name:  "Sehajveer Dhillon",
    role:  "Managing Partner · CIO",
    img:   "/images/Sehaj.jpg",
    tags:  ["Full Stack Dev", "Cybersecurity", "AV Systems", "AI / Real Estate Tech"],
    bio: [
        "Sehaj is a senior Computer Science student with expertise in programming and cybersecurity. He has hands-on experience as a full stack developer at a tech startup that integrates real estate and AI, giving him valuable insight into building modern, innovative applications.",
        "In addition to his development work, Sehaj is an Audio Visual Technician at Adelphi University, where he helps monitor and maintain classroom technology across campus.",
        "His dual background in software development and AV systems allows him to approach challenges with both technical depth and practical problem-solving skills. Sehaj's mix of programming expertise, cybersecurity knowledge, and real-world AV support experience makes him a versatile team member dedicated to delivering technology solutions that are secure, reliable, and user-friendly.",
    ],
};

export default function SehajPage() {
    return (
        <main className="min-h-screen px-6 md:px-14 py-12 md:py-20">
            <div className="max-w-5xl mx-auto">

                <Link href="/team"
                    className="inline-flex items-center gap-1.5 text-sm text-sky-400/60 hover:text-sky-400 transition-colors mb-12">
                    ← Back to Team
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">

                    {/* ── Photo with scan-reveal ── */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-sky-950/15">

                        <motion.div className="absolute inset-0"
                            initial={{ scale: 1.10 }}
                            animate={{ scale: 1.0 }}
                            transition={{ duration: 1.8, ease: "easeOut" }}>
                            <Image src={MEMBER.img} alt={MEMBER.name}
                                fill className="object-cover object-top" />
                        </motion.div>

                        <motion.div
                            className="absolute inset-x-0 bottom-0 bg-white dark:bg-[#020b18]"
                            initial={{ height: "100%" }}
                            animate={{ height: "0%" }}
                            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                        />

                        <motion.div
                            className="absolute inset-x-0 h-[2px]
                                       bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                            style={{ boxShadow: "0 0 12px 3px rgba(56,189,248,0.5)" }}
                            initial={{ bottom: "100%", opacity: 1 }}
                            animate={{ bottom: "0%",   opacity: 0 }}
                            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                        />
                    </div>

                    {/* ── Info panel ── */}
                    <div className="pt-2">

                        <motion.p
                            className="text-xs tracking-[0.3em] uppercase font-semibold text-brand-blue mb-3"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}>
                            {MEMBER.role}
                        </motion.p>

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.6, ease: "easeOut" }}>
                            {MEMBER.name}
                        </motion.h1>

                        <motion.div
                            className="flex flex-wrap gap-2 mb-8"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}>
                            {MEMBER.tags.map(tag => (
                                <span key={tag}
                                    className="px-3 py-1 rounded-full text-xs font-medium
                                               bg-sky-500/10 text-sky-400 border border-sky-500/20
                                               dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20
                                               bg-sky-50 text-sky-700 border-sky-200">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.95, duration: 0.6, ease: "easeOut" }}>
                            {MEMBER.bio.map((para, i) => (
                                <p key={i} className="text-sm md:text-base leading-relaxed
                                                      text-slate-600 dark:text-white/55">
                                    {para}
                                </p>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
