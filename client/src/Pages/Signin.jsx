import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { RouteIndex, RouteSignup } from "@/helpers/RouteName";
import React, { useState } from "react";
import { PiSignIn } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { getenv } from "../helpers/GetEnv";
import { showToast } from "@/helpers/ShowToast";
import GoogleLogin from "@/components/GoogleLogin";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import logo from "@/assets/images/textLogo.png"

// 1. Zod Validation Schema Define Kiya
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Invalid email format. Please use a valid email."),
  password: z.string().min(1, "Password is required."),
});

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = { email, password };
    const result = loginSchema.safeParse(submissionData);

    if (!result.success) {
      const errorArray = JSON.parse(result.error.message);
      setErrors(errorArray[0].message);
      return;
    }

    setErrors("");
    try {
      const data = result.data;
      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/auth/login`,
        data,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const data = response.data;

        dispatch(setUser(data.user));
        showToast("success", data.message);
        navigate(RouteIndex);
      }
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong",
      );
    }

    // setFormData(result.data);

    setEmail("");
    setPassword("");
  };

  return (
    <>
     
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
     

        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
         
        <Link to="/">
             <div className="flex justify-center items-center mb-4 ">
          <img src={logo}  className="w-56" alt="" />
        </div>
        </Link>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome Back
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in your account
            </p>
          </div>

          <div>
            <GoogleLogin />
          </div>
          <div className="w-full flex justify-center items-center border my-5">
            <span className="absolute bg-white ">Or</span>
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
              {/* {errors.email && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.email}
                </p>
              )} */}
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
              {/* {errors.password && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.password}
                </p>
              )} */}
            </div>

            {errors && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {errors}
              </p>
            )}

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
