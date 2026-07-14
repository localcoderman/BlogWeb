import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getenv } from "@/helpers/GetEnv";
import { useAxios } from "@/hooks/useAiox";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/ShowToast";





const axiosOptions = { withCredentials: true };

const Index = () => {

  const dispatch = useDispatch()
  

  const {
  data: UserData,
  loading: userLoading,
} = useAxios(`${getenv("VITE_API_BASE_URL")}/get/auto-get`, axiosOptions);

useEffect(() => {
 
  if (!userLoading && UserData) {
    dispatch(setUser(UserData.user));
    // showToast("success", UserData.message);
  }
}, [UserData, userLoading, dispatch]);



  const {
    data: blogData,
    loading,
    error,
  } = useAxios(`${getenv("VITE_API_BASE_URL")}/blog/blogs`, axiosOptions);



  if (loading) return <Loading />;
  return (
    <div
      className="grid gap-6 md:gap-10 items-stretch mb-10"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
    >
      {blogData && blogData?.blog.length > 0 ? (
        <>
          {blogData.blog.map((blog) => (
            <BlogCard key={blog._id} props={blog} />
          ))}
        </>
      ) : (
        <> Data Not Found</>
      )}
    </div>
  );
}


export default Index;
