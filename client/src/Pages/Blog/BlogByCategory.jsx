import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getenv } from '@/helpers/GetEnv';
import { useAxios } from '@/hooks/useAiox';
import React from 'react'
import { useParams } from 'react-router-dom'
import { TbCategory2 } from "react-icons/tb";



const axiosOptions = { withCredentials: true };


const BlogByCategory = () => {
    const {category} = useParams()
    
    
  const {
    data: blogData,
    loading,
    error,
  } = useAxios(`${getenv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`, axiosOptions, [category]);

  console.log(blogData);
  
if(loading) return <Loading/>
  return (
    <>
    <div className='flex items-center gap-3 text-3xl font-bold  border-b pb-3 mb-5 '>
<TbCategory2 />
<h4 >{ blogData && blogData.categoryData?.name}</h4>
    </div>
    <div className="grid gap-6 md:gap-10 items-stretch  mb-10"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
    {blogData && blogData?.blog.length>0 ? 
    
    <>
    {blogData.blog.map(blog => <BlogCard key={blog._id} props={blog}/>)}

    </>:
    
    
    <> Data Not Found</>}
    </div>
    </>
  )
}

export default BlogByCategory