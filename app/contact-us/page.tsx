"use client";

import React from "react";
import {Form, Input, Button, Textarea, addToast, cn, Tabs, Tab, Card} from "@heroui/react";
import emailjs from "@emailjs/browser";
import { MailIcon } from "@/components/Icons";

const AV_SOLUTIONS = [
  "Display Solutions",
  "Digital Signage / Digital Wall",
  "BYOD/BYOM",
  "Unified Communication",
  "Microsoft Teams Rooms",
  "Zoom Rooms",
  "Cisco Webex",
  "AV over IP",
  "Audio Solutions",
  "Wireless Presentation",
  "Structured Cabling Solutions",
  "Security Solutions",
  "Large Meeting Spaces",
  "Retail Spaces",
  "Specialized Spaces",
];

const ENVIRONMENTS = [
  "Conference Rooms",
  "Boardrooms",
  "Huddle Rooms",
  "Training & Academic Facilities",
];

const SERVICES = [
  "Free Consultation",
  "Free Trainings",
  "Computer Setup & Maintenance",
  "Software Installation & Updates",
  "Peripheral & Device Configuration",
  "Virus Removal & Optimization",
  "Backup & Data Recovery",
  "Router & Switch Configuration",
  "Wired & Wireless Network Setup",
  "Network Optimization & Speed Testing",
  "Server & NAS Setup",
  "VLAN & Security Configuration",
  "Web Development",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[15px] leading-6 text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-foreground/40" />
          <span className="truncate">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ContactAndServices() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState<"success" | "error" | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm("service_0j3des8", "template_f2jejbx", e.currentTarget, "7ildZWFgI2SKIzXo4")
      .then(
        () => {
          setSubmitted("success");
          setEmail("");
          setName("");
          setMessage("");
        },
        () => setSubmitted("error")
      );
  };

  React.useEffect(() => {
    if (!submitted) return;
    addToast({
      title: submitted === "success" ? "Success" : "Oops!",
      description:
        submitted === "success"
          ? "Your message has been sent!"
          : "Something went wrong, please try again.",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
      color: submitted === "success" ? "success" : "danger",
      classNames: {
        base: cn([
          "shadow-sm flex flex-col items-start",
          submitted === "success"
            ? "bg-success-50 dark:bg-success-100/20"
            : "bg-danger-50 dark:bg-danger-100/20",
        ]),
      },
    });
    setSubmitted(null);
  }, [submitted]);

  return (
    <div className="w-full px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Left Side */}
        <div className="md:col-span-3">
          <div className="rounded-3xl p-6 md:p-8 bg-transparent">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold tracking-tight">What We Do</h1>
              <p className="text-foreground/60 mt-1">
                Explore our AV solutions, environments, and a broad range of services.
              </p>
            </div>

            <Tabs aria-label="Info tabs" variant="underlined" className="mb-2">
              <Tab key="av" title="AV Solutions">
                <div className="mt-4">
                  <BulletList items={AV_SOLUTIONS} />
                </div>
              </Tab>
              <Tab key="env" title="Environments">
                <div className="mt-4">
                  <BulletList items={ENVIRONMENTS} />
                </div>
              </Tab>
              <Tab key="svc" title="Services">
                <div className="mt-4">
                  <BulletList items={SERVICES} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-1">
          <Card className="p-5 rounded-2xl border border-white/10 bg-white/10 dark:bg-black/30 backdrop-blur-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Request a quote</h2>
            <Form className="w-full" onSubmit={onSubmit}>
              <Input
                isRequired
                label="Name"
                labelPlacement="outside"
                name="name"
                placeholder="Enter your name"
                type="text"
                value={name}
                onValueChange={setName}
                className="mb-4"
                classNames={{
                  inputWrapper: "border light:border-black/10 dark:border-white/10 rounded-md",
                  input: "text-white",
                }}
              />

              <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onValueChange={setEmail}
                startContent={<MailIcon className="text-xl text-default-400 pointer-events-none shrink-0" />}
                className="mb-4"
                classNames={{
                  inputWrapper: "border light:border-black/10 dark:border-white/10 rounded-md",
                  input: "text-white",
                }}
              />

              <Textarea
                isRequired
                label="Message"
                labelPlacement="outside"
                name="message"
                placeholder="Tell us about your project"
                value={message}
                onValueChange={setMessage}
                minRows={4}
                className="mb-4 text-left"
                classNames={{
                  inputWrapper: "border light:border-black/10 dark:border-white/10 rounded-md",
                  input: "text-white",
                }}
              />

              <Button
                type="submit"
                variant="solid"
                color="primary"
                size="md"
                disabled={!email || !name || !message}
                className="w-full"
              >
                Submit
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
