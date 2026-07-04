import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getenv } from "@/helpers/GetEnv";
import axios from "axios";
import { showToast } from "@/helpers/ShowToast";
import { RouteBlog, RouteCategoryDetails } from "@/helpers/RouteName";
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
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";

const slugFormSchema = z.object({
  tittle: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(50, { message: "Title can have a maximum of 50 characters." }),
  category: z.string().min(1, { message: "Category selection is required." }), // Message fixed
  slug: z
    .string()
    .min(3, { message: "Slug is essential." })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Only lowercase letters, numbers, and hyphens (-) are allowed in the slug.",
    }),
  blogContent: z
    .string()
    .min(3, { message: "Blog content must be at least 3 characters long." }), // Message fixed
});

const axiosOptions = { withCredentials: true };

const AddBlog = () => {
  const user = useSelector((state) => state.user.user);

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
  const selectedCategoryId = watch("category");

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
    const newData = { ...data, author: user.user._id };
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tittle", newData.tittle);
      formData.append("author", newData.author);
      formData.append("slug", newData.slug);
      formData.append("category", newData.category);
      formData.append("blogContent", newData.blogContent);
      console.log(`${getenv("VITE_API_BASE_URL")}/blog/add`);

      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/blog/add`,
        formData,
        axiosOptions,
      );

      if (response.status === 200) {
        const data = response.data;
        //  dispatch(setUser(data.user));
        reset();
        setfile(null);
        setfilePreview(null);
        showToast("success", data.message);

        // navigate(RouteBlog);
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

  const handleEditorData = (event, editor) => {
    const data = editor.getData();

    setValue("blogContent", data, { shouldValidate: true });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="max-w-6xl mb-10 w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-gray-800">
            Create New Blog
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Blog Title"
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

            {/* Slug */}
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
                  <div
                    {...getRootProps()}
                    className="flex flex-col w-36 cursor-pointer"
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Featured Image
                    </label>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed relative rounded-md overflow-hidden bg-gray-50">
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PiUpload size={25} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                onValueChange={(value) =>
                  setValue("category", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category">
                    {selectedCategoryId
                      ? categoryData?.categories?.find(
                          (cat) => cat._id === selectedCategoryId,
                        )?.name
                      : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryData?.categories?.length > 0 &&
                      categoryData.categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Blog Content (CKEditor Fix) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Blog Content
              </label>
              <div className="w-full px-3 py-2 border rounded-md text-sm">
                {/* {...register} ko hata diya jo is custom component ko block kar raha tha */}
                <Editor
                  props={{ initialData: "", onChange: handleEditorData }}
                />
              </div>
              {errors.blogContent && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.blogContent.message}
                </p>
              )}
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
