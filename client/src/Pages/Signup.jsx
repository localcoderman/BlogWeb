import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouteSignin } from "@/helpers/RouteName";
import React, { useState } from "react";
import { PiUserPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import { z } from "zod";

const signupSchema = z
  .object({
    name: z.string().min(3, "Naam kam az kam 3 characters ka hona chahiye."),
    email: z.string().email("Ghalat Email! Sahi format use karein."),
    password: z
      .string()
      .min(6, "Password kam az kam 6 characters ka hona chahiye."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords aapas mein match nahi kar rahay!",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = { name, email, password, confirmPassword };

    const result = signupSchema.safeParse(submissionData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log("Validated Sign Up Data:", result.data);
    setFormData(result.data);

    // Yahan aap apni Backend API call kar sakte hain (e.g., Axios/Fetch)

    // Form khali karne ke liye ()
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Topbar />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Heading Section */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Create an Account
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Enter your details to create a new account
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <PiUserPlus className="text-lg" />
              <span>Sign Up</span>
            </Button>
          </form>

          {/* Footer Section */}
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              to={RouteSignin}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
