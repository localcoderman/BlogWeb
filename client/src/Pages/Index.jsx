import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading'
import { getenv } from '@/helpers/GetEnv';
import { useAxios } from '@/hooks/useAiox';
import React from 'react'


const axiosOptions = { withCredentials: true };

const Index = () => {
 const {
    data: blogData,
    loading,
    error,
  } = useAxios(`${getenv("VITE_API_BASE_URL")}/blog/get-all`, axiosOptions, );

  console.log(blogData);
  
if(loading) return <Loading/>
  return (
    <div className='grid grid-cols-3 gap-10'>
    {blogData && blogData?.blog.length>0 ? 
    
    <>
    {blogData.blog.map(blog => <BlogCard key={blog._id} props={blog}/>)}

    </>:
    
    
    <> Data Not Found</>}
    </div>
  )
}

export default Index