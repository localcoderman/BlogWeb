import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouteSignin } from "@/helpers/RouteName";
import React, { useState } from "react";
import { PiUserPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { getenv } from "@/helpers/GetEnv";
import { showToast } from "@/helpers/ShowToast";
import { ToastContainer } from "react-toastify";


const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required.")
      .min(3, "Name must be at least 3 characters long."),
    email: z
      .string()
      .trim()
      .min(1, "Email address is required.")
      .email("Invalid email format. Please use a valid email."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

const Signup = () => {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const submissionData = { name, email, password, confirmPassword };
    const result = await signupSchema.safeParse(submissionData);

    if (!result.success) {
      const errorArray = JSON.parse(result.error.message);
      setError(errorArray[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword: _, ...backendData } = result.data;

      const response = await axios.post(`${getenv("VITE_API_BASE_URL")}/auth/register` , backendData)

      if(response.status ===200){
       const data = response.data
       showToast("success",data.message)
       console.log(data);
       navigate(RouteSignin)
        
      }
   

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (apiError) {
      console.error("API Error:", apiError);
      const error = apiError.response?.data?.message || "Something went wrong"
      showToast("error",error)

      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Topbar />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <ToastContainer/>
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Create an Account
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Enter your details to create a new account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
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
                disabled={isLoading}
              />
            </div>

            {/* Email Address */}
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
                disabled={isLoading}
              />
            </div>

            {/* Password */}
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
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password */}
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
                disabled={isLoading}
              />
            </div>

           
            {error && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <PiUserPlus className="text-lg" />
              <span>{isLoading ? "Signing Up..." : "Sign Up"}</span>
            </Button>
          </form>

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
