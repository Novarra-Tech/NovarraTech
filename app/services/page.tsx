'use client';

import Link from 'next/link';
import React from 'react';

const Icon = ({ d }: { d: string }) => (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
);
const ICONS = {
    monitor:  "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3",
    software: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21",
    device:   "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z",
    shield:   "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    db:       "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 6c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
    router:   "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
    speed:    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    server:   "M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0A2.25 2.25 0 0019.5 15h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 19.409a2.25 2.25 0 01-1.07-1.916V17.25m19.5-9.75A2.25 2.25 0 0019.5 5.25H4.5A2.25 2.25 0 002.25 7.5v.75m19.5 0A2.25 2.25 0 0121.75 10.5h-19.5A2.25 2.25 0 012.25 8.25v.75m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 11.159a2.25 2.25 0 01-1.07-1.916V8.25",
    lock:     "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
    code:     "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    chat:     "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
};

function ServiceCard({ iconKey, title, description }: { iconKey: keyof typeof ICONS; title: string; description: string }) {
    return (
        <div className="flex gap-4 p-5 rounded-2xl border
                        bg-white dark:bg-white/[0.03]
                        border-slate-100 dark:border-white/[0.07]
                        hover:border-brand-blue/22 dark:hover:border-brand-blue/28
                        hover:shadow-[0_2px_16px_rgba(109,40,217,0.10)] dark:hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]
                        transition-all duration-250 group">
            <div className="shrink-0 mt-0.5 w-9 h-9 rounded-lg
                            bg-sky-50 dark:bg-brand-blue/10
                            flex items-center justify-center
                            text-brand-purple dark:text-brand-blue-lt
                            group-hover:bg-sky-100 dark:group-hover:bg-brand-blue/18 transition-colors">
                <Icon d={ICONS[iconKey]} />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function Section({ label, heading, desc, children }: { label: string; heading: string; desc: string; children: React.ReactNode }) {
    return (
        <div className="mt-20">
            <div className="mb-8">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-brand-purple">{label}</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2">{heading}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">{desc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 pt-14 pb-28">
            <div className="mb-14">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-brand-purple">What We Offer</span>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mt-2 mb-3">Services</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm leading-relaxed">
                    From day-to-day IT to full-stack networks and custom websites — simple, secure, and reliable.
                </p>
            </div>

            {/* Free tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { iconKey: 'chat' as const, title: 'Free Consultation', description: 'Talk through your goals with an expert — zero cost, zero pressure.' },
                    { iconKey: 'monitor' as const, title: 'Free Training', description: 'We teach you how to manage and get the most from your own tech.' },
                ].map(s => (
                    <div key={s.title}
                        className="flex gap-4 p-6 rounded-2xl border
                                   bg-sky-50 dark:bg-brand-blue/[0.06]
                                   border-sky-200 dark:border-brand-blue/20">
                        <div className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-purple dark:text-brand-blue-lt">
                            <Icon d={ICONS[s.iconKey]} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{s.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Section label="Essential Support" heading="Core IT Services" desc="Reliable, day-to-day support for all your computers and devices.">
                <ServiceCard iconKey="monitor"  title="Computer Setup & Maintenance"    description="Professional setup, maintenance, and troubleshooting." />
                <ServiceCard iconKey="software" title="Software Installation & Updates" description="Secure installs and updates to keep your systems current." />
                <ServiceCard iconKey="device"   title="Peripheral & Device Config"      description="Printers, routers, and devices configured seamlessly." />
                <ServiceCard iconKey="shield"   title="Virus Removal & Optimization"    description="Malware removal and system performance tuning." />
                <ServiceCard iconKey="db"       title="Backup & Data Recovery"          description="Reliable backup setup and recovery for critical data." />
            </Section>

            <Section label="Reliable Connectivity" heading="Network Solutions" desc="Secure, fast, stable configurations for homes and businesses.">
                <ServiceCard iconKey="router" title="Router & Switch Configuration"        description="Configured to maximise performance and reliability." />
                <ServiceCard iconKey="router" title="Wired & Wireless Network Setup"       description="Fast, reliable wired and Wi-Fi network setup." />
                <ServiceCard iconKey="speed"  title="Network Optimization & Speed Testing" description="Diagnose and enhance your network performance." />
                <ServiceCard iconKey="server" title="Server & NAS Setup"                   description="Deploy and configure servers or NAS systems." />
                <ServiceCard iconKey="lock"   title="VLAN & Security Configuration"        description="VLANs and security measures to protect your network." />
            </Section>

            <Section label="Your Digital Presence" heading="Web Development" desc="Modern, responsive websites built for speed and your brand.">
                <ServiceCard iconKey="code" title="Web Development" description="Fast, modern, user-friendly websites that represent your business." />
            </Section>

            <div className="mt-24 flex flex-col items-center text-center">
                <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-blue/35 mb-8" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to get started?</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-sm">
                    Book a <strong className="text-slate-800 dark:text-white">free consultation</strong> — no obligation.
                </p>
                <Link href="/contact-us"
                    className="px-8 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-xl
                               text-white text-sm font-semibold transition-colors duration-200
                               shadow-[0_0_24px_rgba(124,58,237,0.35)]">
                    Contact Us
                </Link>
            </div>
        </main>
    );
}
