import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getenv } from "@/helpers/GetEnv";
import axios from "axios";
import { showToast } from "@/helpers/ShowToast";
import { RouteCategoryDetails } from "@/helpers/RouteName";
import { useNavigate } from "react-router-dom";
import { PiUpload } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAxios } from "@/hooks/useAiox";
import Dropzone from "react-dropzone";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Editor from "@/components/Editor";

const slugFormSchema = z.object({
  tittle: z
    .string()
    .min(3, { message: "Tittle must be at least 3 characters long." })
    .max(50, { message: "Tittle can have a maximum of 50 characters." }),
  category: z
    .string()
    .min(3, { message: "Tittle must be at least 3 characters long." }),
  slug: z
    .string()
    .min(3, { message: "Slug is essential." })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Only lowercase letters, numbers, and hyphens (-) are allowed in the slug.",
    }),
  blogContent: z.string().min(3, { message: "Slug is essential." }),
});
const axiosOptions = { withCredentials: true };
const AddBlog = () => {
  const [filePreview, setfilePreview] = useState();
  const [file, setfile] = useState();

  const {
    data: categoryData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/category/all-category`,
    axiosOptions,
  );

  console.log(categoryData);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(slugFormSchema),
    defaultValues: {
      category: "",
      tittle: "",
      slug: "",
      blogContent: "",
    },
  });

  const tittleValue = watch("tittle");

  useEffect(() => {
    if (tittleValue) {
      const generatedSlug = tittleValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setValue("slug", generatedSlug, { shouldValidate: true });
    } else {
      setValue("slug", "");
    }
  }, [tittleValue, setValue]);

  const onSubmit = async (data) => {
    console.log("Validated Form Data:", data);

    try {
      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/category/create/`,
        data,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const data = response.data;
        // dispatch(setUser(data.user));
        showToast("success", data.message);
        reset();
        navigate(RouteCategoryDetails);
      }
    } catch (error) {
      console.log("error aa giya", error);

      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong",
      );
    }
  };

  const handleFileSelection = async (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setfile(file);
    setfilePreview(preview);
  };

  return (
    // max-w-xl rakhna behtar hai taake input fields bohot zyada wide aur ajeeb na lagein dashboard par
    <div className="w-full flex justify-center items-center">
      <Card className="max-w-6xl mb-10">
        <CardHeader>
          {/* Shadcn UI ka standard title header */}
          <CardTitle className="text-xl font-bold text-center text-gray-800">
            Create New Blog
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Tittle
              </label>
              <input
                type="text"
                placeholder="Enter Blog Tittle"
                {...register("tittle")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.tittle
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />
              {errors.tittle && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.tittle.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                placeholder="e.g., electronics"
                {...register("slug")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm bg-gray-50/50 focus:outline-none focus:ring-2 transition-all ${
                  errors.slug
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />
              {errors.slug && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div>
              <Dropzone
                onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="flex flex-col w-36 ">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Featured Image
                    </label>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed">
                      <img src={filePreview} placeholder="click" />
                      <PiUpload size={25} className="text-gray-400" />
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryData &&
                      categoryData.categories.length > 0 &&
                      categoryData.categories.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* <input
              type="text"
              placeholder="Enter Blog Tittle"
              {...register("tittle")}
              className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-destructive focus:ring-destructive/20"
                  : "border-gray-200 focus:border-primary focus:ring-primary/10"
              }`}
            /> */}
              {errors.name && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div >
               <label className="block text-sm font-medium mb-2 text-gray-700">
               Blog Content
              </label>
            <div className="w-full px-3 py-2  border rounded-md text-sm  ">
  <Editor {...register("blogcontent")} props={{ initialData: "" }} />
            </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Data"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
