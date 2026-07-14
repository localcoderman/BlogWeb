import { getenv } from "@/helpers/GetEnv";
import { useAxios } from "@/hooks/useAiox";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import icon from "@/assets/images/placeHolder.png";
import moment from "moment";

const axiosOptions = { withCredentials: true };


const CommentList = ({ props }) => {

  
  const {
    data: commentData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`,
    axiosOptions, [props.callComment]
  );

  // console.log(commentData);
  


  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h4 className="text-2xl font-bold">
        {commentData && commentData.comments.length} <span />
        Comments
      </h4>

      <div className="mt-5">
        {commentData &&
          commentData.comments.length > 0 &&
          commentData.comments.map((comment) => {
            return (
              <div className="flex mb-6 gap-3" key={comment._id}>
               
                 <Avatar className='mt-2'>
                  <AvatarImage src={comment?.user?.avatar || icon} />
                </Avatar>
                <div>
                  <h4 className="font-bold">{comment?.user.name}</h4>
                  <p className="text-xs">{moment(comment?.createdAt).format("DD-MMMM-YYYY")}</p>
                  <div className="mt-2" ><p className=" bg-[#F5F5F5] px-3 py-2 rounded ">
                    {comment?.comment}</p></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentList;
