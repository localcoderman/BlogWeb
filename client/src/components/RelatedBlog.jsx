import { getenv } from "@/helpers/GetEnv";
import { useAxios } from "@/hooks/useAiox";
import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const axiosOptions = { withCredentials: true };

const RelatedBlog = ({ props }) => {
  const {
    data: relatedBlogData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`,
    axiosOptions,
  );

  console.log("DATA ", relatedBlogData);

  if (loading) return <div className="flex items-center justify-center h-screen font-bold">Loading...</div>;

  return (
    <div className="p-5 ">
      <h2 className="text-2xl font-bold mb-2">Related Blogs</h2>
      <div>
        {relatedBlogData && relatedBlogData.relatedBlog.length > 0 ? (
          relatedBlogData.relatedBlog.map((blog) => {
            return (
              <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}> 
              <div className="flex items-center gap-2 mb-3">
                <img className="w-[100px] h-[70px] object-cover rounded-md" src={blog.featureImage} />
                <h4 className="line-clamp-2 text-lg font-semibold">{blog.tittle}</h4>
              </div>
              </Link>
            );
          })
        ) : (
          <div> No Related Blog </div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlog;
