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
import { RouteCategoryDetails } from "@/helpers/RouteName";
const Appsidebar = () => {
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
              <SidebarMenuButton>
                <LiaBlogSolid />
                <Link to=""> Blogs</Link>
              </SidebarMenuButton>
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
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDot />
                <Link to=""> Category items</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Appsidebar;
