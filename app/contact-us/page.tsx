'use client';

import React from 'react';
import { Form, Input, Button, Textarea, cn, Tabs, Tab, Alert } from '@heroui/react';
import emailjs from '@emailjs/browser';
import { MailIcon } from '@/components/Icons';

const AV_SOLUTIONS = [
    'Display Solutions', 'Digital Signage / Digital Wall', 'BYOD/BYOM',
    'Unified Communication', 'Microsoft Teams Rooms', 'Zoom Rooms',
    'Cisco Webex', 'AV over IP', 'Audio Solutions', 'Wireless Presentation',
    'Structured Cabling', 'Security Solutions', 'Large Meeting Spaces',
    'Retail Spaces', 'Specialized Spaces',
];
const ENVIRONMENTS = ['Conference Rooms', 'Boardrooms', 'Huddle Rooms', 'Training & Academic Facilities'];
const SERVICES = [
    'Free Consultation', 'Free Trainings', 'Computer Setup & Maintenance',
    'Software Installation & Updates', 'Peripheral & Device Configuration',
    'Virus Removal & Optimization', 'Backup & Data Recovery',
    'Router & Switch Configuration', 'Wired & Wireless Network Setup',
    'Network Optimization & Speed Testing', 'Server & NAS Setup',
    'VLAN & Security Configuration', 'Web Development',
];

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {items.map(item => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-brand-blue/40 shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

const inputCls = {
    label:        'text-slate-600 dark:text-slate-400 text-xs font-medium',
    inputWrapper: 'bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.09] hover:border-brand-blue/40 dark:hover:border-brand-blue/32 focus-within:border-brand-purple dark:focus-within:border-brand-blue/55 rounded-xl h-11',
    input:        'text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600',
};
const textareaCls = {
    label:        'text-slate-600 dark:text-slate-400 text-xs font-medium',
    inputWrapper: 'bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.09] hover:border-brand-blue/40 dark:hover:border-brand-blue/32 focus-within:border-brand-purple dark:focus-within:border-brand-blue/55 rounded-xl',
    input:        'text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600',
};

export default function ContactPage() {
    const [email, setEmail] = React.useState('');
    const [name,  setName]  = React.useState('');
    const [msg,   setMsg]   = React.useState('');
    const [alert, setAlert] = React.useState<{ color: 'success' | 'danger'; title: string } | null>(null);
    const [closing, setClosing] = React.useState(false);

    const showAlert = (a: { color: 'success' | 'danger'; title: string }) => {
        setClosing(false); setAlert(a);
        setTimeout(() => setClosing(true), 2700);
        setTimeout(() => setAlert(null), 3000);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emailjs.sendForm('service_0j3des8', 'template_f2jejbx', e.currentTarget, '7ildZWFgI2SKIzXo4')
            .then(() => { setEmail(''); setName(''); setMsg(''); showAlert({ color: 'success', title: 'Message sent!' }); },
                  () => showAlert({ color: 'danger', title: 'Something went wrong. Please try again.' }));
    };

    return (
        <main className="max-w-5xl mx-auto px-6 pt-14 pb-28">
            <div className="mb-12">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-brand-purple">Let&apos;s Talk</span>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mt-2 mb-3">Contact Us</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed">
                    Reach out for a free consultation, a quick question, or a full project quote.
                    We&apos;ll respond within 24 hours.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
                {/* Left */}
                <div className="rounded-2xl border p-7 md:p-8
                                bg-white dark:bg-white/[0.03]
                                border-slate-100 dark:border-white/[0.07]">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-1">What We Do</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-6">Browse our AV solutions, environments, and services.</p>
                    <Tabs aria-label="Services" variant="underlined" classNames={{
                        tabList: 'border-b border-slate-200 dark:border-white/[0.08] gap-5 px-0',
                        tab:     'text-slate-500 dark:text-slate-500 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white text-xs font-semibold px-0 pb-2',
                        cursor:  'bg-brand-blue h-[2px]',
                    }}>
                        <Tab key="av"  title="AV Solutions"><div className="mt-5"><Bullets items={AV_SOLUTIONS} /></div></Tab>
                        <Tab key="env" title="Environments"><div className="mt-5"><Bullets items={ENVIRONMENTS} /></div></Tab>
                        <Tab key="svc" title="Services">    <div className="mt-5"><Bullets items={SERVICES} /></div></Tab>
                    </Tabs>
                </div>

                {/* Right — quote form */}
                <div className="rounded-2xl border p-6
                                bg-white dark:bg-white/[0.03]
                                border-slate-100 dark:border-white/[0.07]">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Request a Quote</h2>
                    <p className="text-xs text-slate-400 mb-5">No commitment — just a conversation.</p>
                    <Form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
                        <Input isRequired label="Name" labelPlacement="outside" name="name" placeholder="Your name" type="text" value={name} onValueChange={setName} classNames={inputCls} />
                        <Input isRequired errorMessage="Please enter a valid email" label="Email" labelPlacement="outside" name="email" placeholder="you@example.com" type="email" value={email} onValueChange={setEmail} startContent={<MailIcon className="text-slate-400 shrink-0" />} classNames={inputCls} />
                        <Textarea isRequired label="Message" labelPlacement="outside" name="message" placeholder="Tell us about your project…" value={msg} onValueChange={setMsg} minRows={4} classNames={textareaCls} />
                        <Button type="submit" disabled={!email || !name || !msg}
                            className="w-full rounded-full bg-brand-blue hover:bg-brand-blue-xl text-white text-sm font-semibold h-11
                                       shadow-[0_0_18px_rgba(124,58,237,0.30)] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                            Send Message
                        </Button>
                    </Form>
                </div>
            </div>

            {alert && (
                <div className={cn('fixed bottom-6 left-1/2 -translate-x-1/2 z-50', closing ? 'animate-slide-down' : 'animate-slide-up')}>
                    <Alert color={alert.color} title={alert.title} className="shadow-xl px-5 py-3 rounded-xl w-[300px] text-center text-sm" />
                </div>
            )}
        </main>
    );
}
