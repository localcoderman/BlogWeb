import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useAxios } from "@/hooks/useAiox";
import { getenv } from "@/helpers/GetEnv";
import Loading from "@/components/Loading";
import { showToast } from "@/helpers/ShowToast";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useState } from "react";
import { handleDelete } from "@/helpers/handleDelete";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import moment from "moment/moment";

const axiosOptions = { withCredentials: true };

const BlogDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useAxios(`${getenv("VITE_API_BASE_URL")}/blog/get-all`, axiosOptions, [
    refresh,
  ]);
  const handledelete = async (id) => {
    const response = await handleDelete(
      `${getenv("VITE_API_BASE_URL")}/blog/delete/${id}`,
    );
    setrefresh(!refresh);
    if (response) {
      showToast("success", response.data.message);
    } else {
      showToast("error", "Category Not Deleted");
    }
  };

  if (loading) return <>{<Loading />}</>;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead className="text-center">Tittle</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Slug</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog?._id}>
                    <TableCell className="text-center">{blog?.author?.name}</TableCell>
                    <TableCell className="text-center">{blog?.category?.name}</TableCell>
                    <TableCell>
                      <div className="w-100 whitespace-normal text-center break-words">
                        {blog?.tittle}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {/* {moment(blog?.createdAt).format(`DD-MM-YYYY (h:mm a)`)} */}
                      <div>
                        {moment(blog?.createdAt).format(`DD-MM-YYYY`)}
                      </div>
                      <div>
                        {moment(blog?.createdAt).format(`(h:mm a)`)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-100 whitespace-normal text-center break-words">
                        {blog?.slug}
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Link to={RouteBlogEdit(blog._id)}>
                        <Button
                          variant="outline"
                          className="hover:bg-red-600 hover:text-white"
                          size="icon"
                        >
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handledelete(blog._id)}
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

export default BlogDetails;
