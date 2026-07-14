import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import CommentList from "@/components/CommentList";
import LikeCount from "@/components/LikeCount";
import Loading from "@/components/Loading";
import RelatedBlog from "@/components/RelatedBlog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getenv } from "@/helpers/GetEnv";
import { useAxios } from "@/hooks/useAiox";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";

const axiosOptions = { withCredentials: true };

const BlogPageDetails = () => {
  const { blog  , category} = useParams();

  // console.log(category);
  

  const {
    data: blogData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    axiosOptions, [ blog  , category]
  );

  if (loading) return <Loading />;

  return (
   <div className="flex flex-wrap md:flex-nowrap justify-between gap-5 md:gap-20 p-3 md:p-5 mb-10">
      {blogData && blogData.blog && (
        <>
          <div className="border rounded md:w-[70%] w-full p-5">
            <h1 className="text-2xl font-bold mb-5">
              {blogData?.blog?.tittle}
            </h1>
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={blogData?.blog.author.avatar} />
                </Avatar>
                <div>
                  <p className="font-bold">{blogData?.blog.author.name}</p>
                  <p className="text-sm flex items-center gap-2">
                   {moment(blogData?.blog.createdAt).format("DD-MMMM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <LikeCount props={{blogid:blogData.blog._id}}/>
                <CommentCount props={{blogid:blogData.blog._id}}/>
              </div>
            </div>
            <div className="my-5">
             <img
  src={blogData.blog.featureImage}
  className="rounded w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
/>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: blogData.blog.blogContent || "",
              }}
              className="px-3"
            ></div>

            <div className="border-t mt-5 pt-5">
              <Comment className="mt-5" props={{ blogid: blogData.blog._id }} />
            </div>
          </div>
        </>
      )}
      <div className="border rounded md:w-[30%] w-full">

        <RelatedBlog props={{category:category , currentBlog : blog}}/>
      </div>
    </div>
  );
};

export default BlogPageDetails;
