'use client';

import { title } from "@/components/primitives";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";

type SectionProps = {
  kicker: string;
  heading: string;
  description?: string;
  children: React.ReactNode;
};

function Section({ kicker, heading, description, children }: SectionProps) {
  return (
    <section className="mt-16 text-center">
      <p className="text-xs tracking-widest uppercase text-primary/80 font-semibold">{kicker}</p>
      <h2 className="text-2xl font-semibold mt-2">{heading}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3">{description}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-6">{children}</div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
}

function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <Card
      shadow="sm"
      radius="lg"
      className="border border-border/60 text-center max-w-xs bg-white/80 backdrop-blur-sm transition-shadow"
    >
      <CardHeader className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardBody>
      <CardFooter />
    </Card>
  );
}

export default function ServicesPage() {
  const coreIT = [
    {
      title: "Computer Setup & Maintenance",
      description: "Professional setup, maintenance, and troubleshooting for all computers.",
    },
    {
      title: "Software Installation & Updates",
      description: "Secure software installs and updates to keep your systems up to date.",
    },
    {
      title: "Peripheral & Device Configuration",
      description: "We handle printer, router, and device setup for seamless operation.",
    },
    {
      title: "Virus Removal & Optimization",
      description: "Comprehensive malware removal and performance tuning.",
    },
    {
      title: "Backup & Data Recovery",
      description: "Reliable backup setup and recovery solutions for your data.",
    },
  ];

  const network = [
    {
      title: "Router & Switch Configuration",
      description: "Configuration for routers and switches to optimize performance.",
    },
    {
      title: "Wired & Wireless Network Setup",
      description: "Setup and tuning for fast, reliable wired and Wi-Fi networks.",
    },
    {
      title: "Network Optimization & Speed Testing",
      description: "Diagnose and enhance your network’s performance and stability.",
    },
    {
      title: "Server & NAS Setup",
      description: "Deploy and configure small business servers or NAS systems.",
    },
    {
      title: "VLAN & Security Configuration",
      description: "Implement VLANs and security measures to protect your network.",
    },
  ];

  const dev = [
    {
      title: "Web Development",
      description: "Build fast, modern, and user-friendly websites for your business.",
    },
  ];

  const freeServices = [
    {
      title: "Free Consultation",
      description: "Discuss your goals and get expert advice — completely free.",
    },
    {
      title: "Free Trainings",
      description: "We offer free sessions to help you learn and manage your tech better.",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 text-center">
      {/* Hero */}
      <div className="mt-10">
        <h1 className={`${title()} text-center`}>Services</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
          At <strong>Novarra</strong>, we provide comprehensive IT and network solutions — from
          setup to long-term support. We make technology simple, secure, and reliable.
        </p>
      </div>

      {/* Free Services Section */}
      <div className="mt-12 mb-16 mx-auto flex flex-wrap justify-center gap-6">
        {freeServices.map((service) => (
          <Card
            key={service.title}
            shadow="sm"
            radius="lg"
            className="border border-border/60 text-center max-w-xs bg-white/80 backdrop-blur-sm transition-shadow"
          >
            <CardHeader className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </CardBody>
            <CardFooter />
          </Card>
        ))}
      </div>

      {/* Core IT Section */}
      <Section
        kicker="Essential Support"
        heading="Core IT Services"
        description="Reliable, day-to-day technical support for all your computer and device needs."
      >
        {coreIT.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </Section>

      {/* Network Section */}
      <Section
        kicker="Reliable Connectivity"
        heading="Network Solutions"
        description="Secure, fast, and stable network configurations for homes and businesses."
      >
        {network.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </Section>

      {/* Development Section */}
      <Section
        kicker="Your Digital Presence"
        heading="Development"
        description="Modern, responsive web solutions tailored to your brand."
      >
        {dev.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </Section>

      {/* CTA */}
      <section className="mt-24 text-center">
        <h2 className="text-2xl font-semibold mb-3">Ready to Start?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Contact us for a <strong>free consultation</strong> or{" "}
          <strong>training session</strong>. Let’s make your technology effortless.
        </p>
        <a
          href="/contact-us"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
}
