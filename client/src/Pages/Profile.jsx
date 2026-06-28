import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import userIcon from "@/assets/images/placeHolder.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { getenv } from "@/helpers/GetEnv";
import { Textarea } from "@/components/ui/textarea"

const loginSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 character long."),
  bio: z
    .string()
    .min(3, "Bio must be at least 3 character long."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Invalid email format. Please use a valid email."),
  password: z.string().min(1, "Password is required."),
});

const Profile = () => {
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

    setEmail("");
    setPassword("");
  };

  const user = useSelector((user) => user?.user?.user);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className=" max-w-3xl mx-auto">
      <CardContent>
      <div className="flex justify-center items-center ">
        <Avatar className="w-28 h-28">
          <AvatarImage src={user?.user?.avatar || userIcon} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Name
              </label>
              <Input
                id="name"
               type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
              />
            </div>
            
            
            
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
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="bio"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Bio
              </label>

              <Textarea
              id="bio"
               value={bio}
               onChange={(e) => setBio(e.target.value)}
               placeholder="Enter Your Bio"
              />
            </div>

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
            </div>

            {/* {errors && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {errors}
              </p>
            )} */}

            <Button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
