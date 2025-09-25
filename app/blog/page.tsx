'use client'
import { title } from "@/components/primitives";
import {Form, Input, Button, Textarea} from "@heroui/react";
import emailjs from "emailjs-com";


import React from "react";

export default function BlogPage() {
  const [submitted, setSubmitted] = React.useState<"success" | "error" | null>(null);

  const onSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_0j3des8",
      "template_f2jejbx",
      e.currentTarget,
      "7ildZWFgI2SKIzXo4"
    ).then(
      (result) => {
        console.log("Email sent:", result.text);
        setSubmitted("success");
      },
      (error) => {
        console.error("Email error:", error.text);
        setSubmitted("error");
      }
    );
  };

  return (
    <>
      <div className="mb-12">
        <h1 className={title()}>Contact Us</h1>
      </div>
      
      <Form className="w-full" onSubmit={onSubmit}>
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
          className="mb-4"
        />

        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          className="mb-4"
        />

        <Textarea
          isRequired
          label="Message"
          labelPlacement="outside"
          name="message"
          placeholder="Type your message"
          minRows={4}
          //variant="bordered"
          className="mb-4 text-left"
        />
        <div className="flex justify-center w-full">
          <Button type="submit" variant="bordered">
            Submit
          </Button>
        </div>
      </Form>

      {submitted === "success" && (
        <p className="text-green-500 mt-4">Your message has been sent!</p>
      )}
      {submitted === "error" && (
        <p className="text-red-500 mt-4">Something went wrong, please try again.</p>
      )}
    </>
  );

}
