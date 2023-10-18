"use client"; 

import { useState } from "react";
import { MdEmail } from "react-icons/md";
import Container from "./container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


// FIXME: new dabase connection and new validation + toast 

export default function Contact() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isErrorToast, setIsErrorToast] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validation
    if (!email) {
      setToastMessage("Email Field is Empty! ");
      setIsErrorToast(true);
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.ok) {
        console.log("Email:", email);
        setEmail("");
        setToastMessage("Thank You for subscribing to Inepal! 🙂");
        setIsErrorToast(false);
        setShowToast(true);
      } else {
        console.error("Sorry something went wrong! 😢");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
      <Container className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl">
              Sign up for our newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-stone-500 md:mb-12 sm:text-xl">
              Stay up to date with the features, announcements, and exclusive
              insights. Feel free to sign up with your email.
            </p>
            <form action="#" onSubmit={handleSubmit}>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-stone-900 "
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <MdEmail className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                  </div>
                  <Input
                    onChange={handleEmailChange}
                    value={email}
                    className=" pl-10 "
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                  />
                </div>
                <div>
                  <Button
                  className=" md:mx-5 w-full"
                    disabled={isSubmitting}
                  >
                    <span>Subscribe</span>
                  </Button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-stone-500 newsletter-form-footer">
                We care about the protection of your data.{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read our Privacy Policy
                </a>
                .
              </div>
            </form>
          </div>
        </div>
     
    </Container>
  );
}
