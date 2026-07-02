import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
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

const axiosOptions = { withCredentials: true };

const CategoryDetails = () => {

  const [refresh, setrefresh] = useState (false)
  const {
    data: categoryData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/category/all-category`,
    axiosOptions,[refresh]
  );
const handledelete = async(id)=>{
   const response = await handleDelete(`${getenv("VITE_API_BASE_URL")}/category/delete/${id}`)
   setrefresh(!refresh)
   if(response){
    showToast("success",response.data.message)
   }else{
    showToast("error","Category Not Deleted")
   }
  }

  if (loading) return <>{<Loading />}</>;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.categories.length > 0 ? (
                categoryData.categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                      <Link to={RouteEditCategory(category._id)}>
                        <Button
                          variant="outline"
                          className="hover:bg-red-600 hover:text-white"
                          size="icon"
                        >
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                      onClick={()=>handledelete(category._id)}
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

export default CategoryDetails;
