'use client'
import {title} from "@/components/primitives";
import {Form, Input, Button, Textarea, addToast,cn} from "@heroui/react";
import emailjs from "@emailjs/browser";
import React from "react";
import {MailIcon} from "@/components/Icons";

export default function BlogPage() {
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitted, setSubmitted] = React.useState<"success" | "error" | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_0j3des8",
            "template_f2jejbx",
            e.currentTarget,
            "7ildZWFgI2SKIzXo4"
        ).then(
            () => {
                setSubmitted("success");
                setEmail("");
                setName("");
                setMessage("");
            },
            () => {
                setSubmitted("error");
            }
        );
    };

    React.useEffect(() => {
        if (submitted === "success") {
            addToast({
                title: "Success",
                description: "Your message has been sent!",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "success",
                classNames: {
                    base: cn([
                        "bg-success-50 dark:bg-success-100/20 shadow-sm",
                        "flex flex-col items-start",
                        "border-success-200 dark:border-success-100",
                    ]),
                    icon: "w-6 h-6 text-success-500 fill-current",
                },
            });
            setSubmitted(null);
        } else if (submitted === "error") {
            addToast({
                title: "Oops!",
                description: "Something went wrong, please try again.",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger",
                classNames: {
                    base: cn([
                        "bg-danger-50 dark:bg-danger-100/20 shadow-sm",
                        "flex flex-col items-start",
                        "border-danger-200 dark:border-danger-100",
                    ]),
                    icon: "w-6 h-6 text-danger-500 fill-current",
                },
            });
            setSubmitted(null);
        }
    }, [submitted]);

    return (
        <>
            <div className="mb-12">
                <h1 className={title()}>Contact Us</h1>
            </div>

            <Form className="w-full " onSubmit={onSubmit}>
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
                        input: "text-white"
                    }}

                />

                <Input
                    isRequired
                    errorMessage="Please enter a valid email"
                    label="Email"
                    //color="primary"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onValueChange={setEmail}
                    startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0"/>}
                    className="mb-4"
                    classNames={{
                        inputWrapper: "border light:border-black/10 dark:border-white/10 rounded-md",
                        input: "text-white"
                    }}
                />

                <Textarea
                    isRequired
                    label="Message"
                    labelPlacement="outside"
                    name="message"
                    placeholder="Type your message"
                    value={message}
                    onValueChange={setMessage}
                    minRows={4}
                    className="mb-4 text-left"
                    classNames={{
                        inputWrapper: "border light:border-black/10 dark:border-white/10 rounded-md",
                        input: "text-white"
                    }}
                />

                <div className="flex justify-center w-full">
                    <Button 
                        type="submit"
                        variant="solid"
                        color="primary"
                        size="lg"
                        disabled={!email || !name || !message}
                        className="border light:border-black/10 dark:border-white/10 light:text-black dark:text-white"
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
}
