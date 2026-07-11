import { getenv } from '@/helpers/GetEnv';
import { useAxios } from '@/hooks/useAiox';
import React from 'react'
import { FaRegComment } from "react-icons/fa";
import { Button } from './ui/button';



const axiosOptions = { withCredentials: true };


const CommentCount = ({props}) => {

      const {
        data: commentData,
        loading,
        error,
      } = useAxios(
        `${getenv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
        axiosOptions
      );
    

  return (
    <button type='button' className='flex justify-between items-center gap-2'>
        <FaRegComment />
        {commentData && commentData.commentCount}
    </button>
  )
}

export default CommentCount