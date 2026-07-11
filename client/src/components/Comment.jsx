import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaComments } from "react-icons/fa";
import z from "zod";
import { Button } from "./ui/button";
import { showToast } from "@/helpers/ShowToast";
import axios from "axios";
import { getenv } from "@/helpers/GetEnv";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import { useState } from "react";

const slugFormSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be at least 3 characters long." })
    .max(500, { message: "Comments can be a maximum of 500 characters." }),
});

const Comment = ({ props }) => {
  const user = useSelector((state) => state.user.user); 
  const [callComment, setcallComment] = useState()

    


  // console.log(user.user._id);
  // // console.log(props.blogid);

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
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log("Comment button hit :", data);

    try {
      const newData = { ...data, blogid: props.blogid, user: user.user._id };

      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/comment/add`,
        newData,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const data = response.data;
        // dispatch(setUser(data.user));
        showToast("success", data.message);
        setcallComment(data.comment)
        
        reset();
        // navigate(RouteCategoryDetails);
      }
    } catch (error) {
      console.log("error aa giya", error);

      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong",
      );
    }
  };
  return (
    <div>
      <h4 className="flex item gap-2 text-2xl mb-5 font-bold">
        <FaComments className="text-red-600" /> Comment
      </h4>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Textarea
              placeholder="Type your Comment Here..."
              className="resize-none pt-5 border border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-600"
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-xs text-destructive font-medium mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className=" mt-2 font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Data"}
          </Button>
        </form>
      </div>

         <div className="border-t mt-5 pt-5">
                    <h4>Comments</h4>
                    <CommentList
                      className="mt-5"
                      props={{ blogid: props.blogid , callComment}}
                    />
                  </div>
      
    </div>
  );
};

export default Comment;
