import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "@/assets/images/placeHolder.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import { getenv } from "@/helpers/GetEnv";
import { useAxios } from "@/hooks/useAiox";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { showToast } from "@/helpers/ShowToast";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/user/user.slice";
import { RouteIndex } from "@/helpers/RouteName";


const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  bio: z.string().min(3, "Bio must be at least 3 characters long."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Invalid email format. Please use a valid email."),
  password: z.string(),
});

const axiosOptions = { withCredentials: true };

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filePreview, setfilePreview] = useState();
  const [file, setfile] = useState();


  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const {
    data: userData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/user/get-user/${user?.user?._id}`,
    axiosOptions,
  );


  useEffect(() => {
    if (userData?.user) {
      reset({
        name: userData.user.name || "",
        email: userData.user.email || "",
        bio: userData.user.bio || "",
        password: "", 
      });
    }
  }, [userData, reset]);

  const handleFileSelection = async (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setfile(file);
    setfilePreview(preview);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("file", file); 
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("password", data.password);

      const response = await axios.put(
        `${getenv("VITE_API_BASE_URL")}/user/update-user/${user?.user?._id}`,formData,
        axiosOptions
      );
      
      if (response.status === 200) {
        const data = response.data;
        dispatch(setUser(data.user));
        showToast("success", data.message);
        // navigate(RouteIndex);
      }
    } catch (error) {
      console.log("error aa giya",error);
      
      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong",
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-6">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex flex-col justify-center items-center"
              >
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative group cursor-pointer border border-red-600">
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : userData?.user?.avatar || userIcon
                    }
                  />
                  <div className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full justify-center items-center bg-black opacity-30 group-hover:flex hidden">
                    <IoCameraOutline className="size-10" color="white" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                placeholder="Enter Your Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.name.message}
                </p>
              )}
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
                autoComplete="email"
                placeholder="name@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
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
                placeholder="Enter Your Bio"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Update Password
                </label>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {error.message || "Something went wrong"}
              </p>
            )}

            <Button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <span>Save Changes</span>
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
