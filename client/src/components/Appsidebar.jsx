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
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails } from "@/helpers/RouteName";
import { useAxios } from "@/hooks/useAiox";
import { getenv } from "@/helpers/GetEnv";
import { useState } from "react";



const axiosOptions = { withCredentials: true };
const Appsidebar = () => {

   const {
      data: categoryData,
      loading,
      error,
    } = useAxios(
      `${getenv("VITE_API_BASE_URL")}/category/all-category`,
      axiosOptions
    );
    
  return (
    <Sidebar>
      <SidebarHeader className="bg-white flex">
        <img src={textlogo} alt="loading" className=" w-full p-2 mt-1.5" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <CiHome />
                <Link to=""> Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to={RouteCategoryDetails}>
                <SidebarMenuButton>
                  <BiCategoryAlt />
                  Categories
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link to={RouteBlog}>
                <SidebarMenuButton>
                 <LiaBlogSolid />
                  Blogs
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaRegComments />
                <Link to=""> Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <PiUsersThreeLight />
                <Link to=""> Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu> 
           {categoryData?.categories?.length > 0 && categoryData?.categories.map((category) => (
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
