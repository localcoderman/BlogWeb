import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
import { useAxios } from "@/hooks/useAiox";
import { getenv } from "@/helpers/GetEnv";
import Loading from "@/components/Loading";
import { showToast } from "@/helpers/ShowToast";
import moment from "moment";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import imageIcon from "@/assets/images/placeHolder.png"

const axiosOptions = { withCredentials: true };

const UserDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: userData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/user/get-all-users`,
    axiosOptions,
    [refresh],
  );

  console.log(userData);

  const handledelete = async (id) => {
    const response = await handleDelete(
      `${getenv("VITE_API_BASE_URL")}/user/delete-user/${id}`,
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="font-extrabold">
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData && userData.users.length > 0 ? (
                userData.users.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{<Avatar>
                        <AvatarImage src={user?.avatar || imageIcon}/>
                        </Avatar>}</TableCell>
                    <TableCell>
                      {moment(user?.createdAt).format("DD-MMMM-YYYY")}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => handledelete(user._id)}
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

export default UserDetails;
