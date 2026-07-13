import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import textlogo from "@/assets/images/textLogo.png";
import { CiHome } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegComments } from "react-icons/fa6";
import { PiUsersThreeLight } from "react-icons/pi";
import { GoDot } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteUser,
} from "@/helpers/RouteName";
import { useAxios } from "@/hooks/useAiox";
import { getenv } from "@/helpers/GetEnv";
import { useState } from "react";
import { useSelector } from "react-redux";

const axiosOptions = { withCredentials: true };
const Appsidebar = () => {
  const user = useSelector((state) => state.user.user);
  const {
    data: categoryData,
    loading,
    error,
  } = useAxios(
    `${getenv("VITE_API_BASE_URL")}/category/all-category`,
    axiosOptions,
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-white flex">
        <img src={textlogo} alt="loading" className=" w-full p-2 mt-1.5" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <Link to="" className="cursor-pointer">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CiHome />
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            {user && user.isLoggedIn && user.user.role === "admin" ? 
          <>
           <Link to={RouteCategoryDetails}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategoryAlt />
                  Categories
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <Link to={RouteBlog}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LiaBlogSolid />
                  Blogs
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <Link to={RouteCommentDetails}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegComments />
                  Comments
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <Link to={RouteUser}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PiUsersThreeLight />
                  Users
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          </>  :<>
          </>
          
          }

          {
            user && user.isLoggedIn && user.user.role === 'user' ? <>

             <Link to={RouteCommentDetails}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegComments />
                  Comments
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            
            
            </> : <>
            </>
          }

          <Link to={""}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PiUsersThreeLight />
                  About
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
           
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData?.categories?.length > 0 &&
              categoryData?.categories.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton>
                    <GoDot />
                    <Link to={RouteBlogByCategory(category.slug)}>
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Appsidebar;
