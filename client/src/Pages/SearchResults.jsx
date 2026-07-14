import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getenv } from '@/helpers/GetEnv';
import { useAxios } from '@/hooks/useAiox';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const axiosOptions = { withCredentials: true };

const SearchResults = () => {
    const [searchparams] = useSearchParams()
    const q = searchparams.get('q')
     const {
        data: blogData,
        loading,
        error,
      } = useAxios(`${getenv("VITE_API_BASE_URL")}/blog/search?q=${q}`, axiosOptions, [searchparams]);
    
      console.log(blogData);
    // console.log(q);
    if(loading) return <Loading/>
  return (
    
  <>
   <div className='flex items-center gap-3 text-3xl font-bold  border-b pb-3 mb-5'>
<h4 > Search Results For: {q} </h4>
    </div>
    <div className="grid gap-6 md:gap-10 items-stretch"
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

export default SearchResults