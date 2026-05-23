'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const team = [
    {
        name: 'Gabriel Kaloo', role: 'CEO', title: 'Managing Partner',
        about: 'Senior CS student and AV Technician at Adelphi University. Manages classroom systems, leads enterprise IT for high-profile clients, and brings a security-first mindset to every engagement.',
        img: '/images/Gabe.png', id: 'gabe',
        tags: ['AV Systems', 'IT Support', 'Cybersecurity'],
    },
    {
        name: 'Sehajveer Dhillon', role: 'CIO', title: 'Managing Partner',
        about: 'Senior CS student with full-stack dev experience at an AI/real-estate startup. Also an AV Technician at Adelphi — bridging software engineering and physical infrastructure.',
        img: '/images/Sehaj.jpg', id: 'sehaj',
        tags: ['Full Stack', 'Cybersecurity', 'AV Tech'],
    },
    {
        name: 'Onkar Dhillon', role: 'COO', title: 'Managing Partner',
        about: 'Senior CS student leading a Help Desk team monitoring 100K+ users across the Adelphi domain. Deep expertise in programming, cybersecurity, and technology leadership.',
        img: '/images/Onkar.jpg', id: 'onkar',
        tags: ['Help Desk', 'Cybersecurity', 'Leadership'],
    },
];

export default function TeamPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 pt-14 pb-28">
            <div className="mb-16">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-brand-purple">The People</span>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mt-2 mb-3">Meet the Team</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm leading-relaxed">
                    Three managing partners with expertise in IT, cybersecurity, and software development.
                </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
                initial="hidden" animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
                {team.map((m) => (
                    <motion.div key={m.id}
                        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}>
                        <Link href={`/team/${m.id}`} className="group block h-full">
                            <article className="h-full flex flex-col rounded-2xl border overflow-hidden
                                                bg-white dark:bg-white/[0.03]
                                                border-slate-100 dark:border-white/[0.07]
                                                hover:border-sky-200 dark:hover:border-brand-blue/28
                                                hover:shadow-[0_4px_24px_rgba(109,40,217,0.12)] dark:hover:shadow-none
                                                transition-all duration-250">
                                {/* Photo */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-white/5">
                                    <Image src={m.img} alt={m.name} fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#08010f] via-transparent to-transparent" />
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-1 p-5">
                                    <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-brand-purple mb-0.5">
                                        {m.title} · {m.role}
                                    </p>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{m.name}</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">{m.about}</p>

                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {m.tags.map(tag => (
                                            <span key={tag}
                                                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium
                                                           bg-sky-50 dark:bg-brand-blue/8
                                                           text-sky-700 dark:text-brand-blue-lt
                                                           border border-sky-200 dark:border-brand-blue/18">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-600 group-hover:text-brand-purple dark:group-hover:text-brand-blue-lt transition-colors">
                                        View profile →
                                    </p>
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
}
