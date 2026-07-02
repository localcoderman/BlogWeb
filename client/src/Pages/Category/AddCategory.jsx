import { z } from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getenv } from "@/helpers/GetEnv";
import axios from "axios";
import { showToast } from "@/helpers/ShowToast";
import { RouteCategoryDetails } from "@/helpers/RouteName";
import { useNavigate } from "react-router-dom";

const slugFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name kam az kam 3 characters ka hona chahiye" })
    .max(50, { message: "Name zyada se zyada 50 characters ka ho sakta hai" }),
  slug: z
    .string()
    .min(3, { message: "Slug zaroori hai" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug mein sirf lowercase letters, numbers, aur hyphens (-) allowed hain",
    }),
});

const AddCategory = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(slugFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });


  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") 
        .replace(/\s+/g, "-")         
        .replace(/-+/g, "-");         

      setValue("slug", generatedSlug, { shouldValidate: true });
    } else {
      setValue("slug", "");
    }
  }, [nameValue, setValue]);
  

  const onSubmit = async (data) => {
    console.log("Validated Form Data:", data);
  
     try {
     
      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/category/create/`,data,
        {withCredentials:true}
      );
      
      if (response.status === 200) {
        const data = response.data;
        // dispatch(setUser(data.user));
        showToast("success", data.message);
        reset()
        navigate(RouteCategoryDetails);
      }
    } catch (error) {
      console.log("error aa giya",error);
      
      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong",
      );
    }
  

  };

  return (
    // max-w-xl rakhna behtar hai taake input fields bohot zyada wide aur ajeeb na lagein dashboard par
    <Card className="max-w-xl mx-auto mt-10 shadow-sm">
      <CardHeader>
        {/* Shadcn UI ka standard title header */}
        <CardTitle className="text-xl font-bold text-center text-gray-800">
          Create New Category
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g., Electronics"
              {...register("name")}
              className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-destructive focus:ring-destructive/20"
                  : "border-gray-200 focus:border-primary focus:ring-primary/10"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-destructive font-medium mt-1">
                {errors.name.message}
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
  );
};

export default AddCategory;