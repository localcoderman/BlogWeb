import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FaRegCalendarCheck } from "react-icons/fa";
import icon from "@/assets/images/placeHolder.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";
import { MdVerified } from "react-icons/md";

const BlogCard = ({ props }) => {
  const user = useSelector((state) => state.user.user);


  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)} >
    <Card className="pt-5">
      <CardContent>
        <div className="flex justify-between items-center mx-1">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={props.author.avatar || icon} />
            </Avatar>
            <span>{props.author.name}</span>
          </div>
          {props.author.role === "admin" && (
           <MdVerified className="size-6 text-red-600" />
          )}
        </div>
        <div className=" my-2">
          {<img src={props.featureImage} className="rounded aspect-video w-full object-cover" />}
        </div>

        <div className="mt-5">
          <p className="flex items-center gap-2 mb-2 ">
            <FaRegCalendarCheck />
            <span>{moment(props.createdAt).format("DD-MMM-YYYY")}</span>
          </p>
          <h2 className="text-2xl font-bold line-clamp-2">{props.tittle}</h2>
        </div>
      </CardContent>
    </Card>
    
    </Link>
  );
};

export default BlogCard;
