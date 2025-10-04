'use client';

import { title } from "@/components/primitives";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";
import { Laptop, Wrench, Cloud, Shield } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "AV Design & Consulting",
      icon: <Laptop className="w-8 h-8 text-primary" />,
      description:
        "From concept planning and system architecture to final implementation — we design audiovisual solutions tailored to your environment and business needs.",
    },
    {
      title: "Installation & Integration",
      icon: <Wrench className="w-8 h-8 text-primary" />,
      description:
        "Our technicians handle the full installation process — wiring, mounting, configuration, and calibration for a clean, professional result.",
    },
    {
      title: "Cloud & Network Solutions",
      icon: <Cloud className="w-8 h-8 text-primary" />,
      description:
        "We build reliable, scalable cloud and network infrastructures that support conferencing, automation, and smart building control.",
    },
    {
      title: "Managed Services & Support",
      icon: <Shield className="w-8 h-8 text-primary" />,
      description:
        "Keep your systems running flawlessly with proactive monitoring, remote management, and fast on-site support from our certified team.",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6">
      <h1 className={`${title()}`}>Services</h1>
      <p> </p>
      <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10 mt-8">
        At <strong>Novarra</strong>, we provide comprehensive
        audiovisual and IT infrastructure solutions — designed for performance,
        reliability, and seamless integration. From system design to long-term
        support, we help you build the future of connected environments.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Card
            key={service.title}
            shadow="md"
            radius="lg"
            isHoverable
            className="border border-border"
          >
            <CardHeader className="flex flex-col items-center text-center space-y-3 pt-6">
              {service.icon}
              <h2 className="text-xl font-semibold">{service.title}</h2>
            </CardHeader>
            <CardBody className="px-6 pb-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </CardBody>
            <CardFooter className="px-6 pb-6">
              {/* optional: could put a “Learn more” link or button */}
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="mt-24 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Start a Project?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Let’s bring your ideas to life with modern, reliable AV and IT
          solutions. Contact our team today for a free consultation.
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
