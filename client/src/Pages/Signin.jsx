import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Shadcn ka wrapper component
import { RouteSignup } from "@/helpers/RouteName";
import React, { useState } from "react";
import { PiSignIn } from "react-icons/pi";
import { Link } from "react-router-dom";
import { z } from "zod";

// 1. Zod Validation Schema Define Kiya
const loginSchema = z.object({
  email: z.string().email("Ghalat Email! Sahi format use karein."),
  password: z
    .string()
    .min(6, "Password kam az kam 6 characters ka hona chahiye."),
});

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({}); // Errors store karne ke liye

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = { email, password };

    // 2. Zod Se Validate Karein
    const result = loginSchema.safeParse(submissionData);

    if (!result.success) {
      // Agar validation fail ho jaye, to errors form par set karein
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return; // Code yahan se aage nahi jayega
    }

    // Agar validation pass ho jaye
    setErrors({}); // Pehle wale errors clear karein
    console.log("Validated Sign In Data:", result.data);
    setFormData(result.data);

    // API call logic yahan aayegi...

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Topbar />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Heading Section */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome Back
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in your account
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <PiSignIn className="text-lg" />
              <span>Sign In</span>
            </Button>
          </form>

          {/* Footer Section */}
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              to={RouteSignup}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
