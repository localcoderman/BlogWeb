import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  RouteAddCategory,
  RouteCommentDetails,
  RouteEditCategory,
} from "@/helpers/RouteName";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleDelete } from "@/helpers/handleDelete";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "@/hooks/useAiox";
import { getenv } from "@/helpers/GetEnv";
import Loading from "@/components/Loading";
import { showToast } from "@/helpers/ShowToast";
import moment from "moment";

const axiosOptions = { withCredentials: true };

const CommentDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: commentsData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/comment/get-all-comments`,
    axiosOptions,
    [refresh],
  );

  console.log(commentsData);

  const handledelete = async (id) => {
    const response = await handleDelete(
      `${getenv("VITE_API_BASE_URL")}/comment/delete-comment/${id}`,
    );
    setrefresh(!refresh);
    if (response) {
      showToast("success", response.data.message);
    } else {
      showToast("error", "Comment Not Deleted");
    }
  };

  if (loading) return <>{<Loading />}</>;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="font-extrabold ">
                <TableHead className="text-center">Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commentsData && commentsData.comments.length > 0 ? (
                commentsData.comments.map((comment) => (
                  <TableRow key={comment?._id}>
                    <TableCell className="flex justify-center">
                      <div className="max-w-100 whitespace-normal text-center break-words">

                      {comment?.blogid?.tittle}
                      
                      </div>
                      </TableCell>

                    <TableCell>{comment?.user.name}</TableCell>
                    <TableCell>
                      {moment(comment?.createdAt).format("DD-MMMM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[250px] whitespace-normal text-center break-words">
                        {comment?.comment}
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-3 h-full">
                      

                      <Button
                        onClick={() => handledelete(comment._id)}
                        variant="outline"
                        className="hover:bg-red-600 hover:text-white"
                        size="icon"
                      >
                        <FaRegTrashCan />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data Not Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentDetails;
