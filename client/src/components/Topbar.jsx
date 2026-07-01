import React from "react";
import textlogo from "@/assets/images/textLogo.png";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import SearchBox from "./SearchBox";
import { RouteIndex, RouteProfile, RouteSignin } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/placeHolder.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";
import { getenv } from "@/helpers/GetEnv";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/ShowToast";



const Topbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);

  const handleLogout = async ()=>{
    try {
      const response = await axios.get(`${getenv("VITE_API_BASE_URL")}/auth/logout`,{withCredentials:true})
      dispatch(removeUser())

      if (response.status === 200) {
              const data = response.data;
      
              dispatch(removeUser());
              showToast("info", data.message);
              navigate(RouteIndex);
            }
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white border-b px-5">
      <div className="w-60">
        <Link to={RouteIndex}>
          <img src={textlogo} alt="" />
        </Link>
      </div>
      <div className="w-[500px] boder-none">
        <SearchBox />
      </div>
      <div>
        {!user?.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignin}>
              <PiSignIn />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage src={user?.user?.avatar || userIcon} />
              <AvatarFallback>{user?.user?.name?.charAt(0).toUpperCase() || "TA"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate"> {user?.user?.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate" title={user?.user?.email}> {user?.user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild className="cursor-pointer"> 
                 
                  <Link to={RouteProfile}>
                   <FaRegUser />
                  Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer"> 
                 
                  <Link to="" >
                  <FaPlus />
                  Create Blog
                  </Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer"> 
                 
                
               <Button variant="ghost"  className="w-full text-start " onClick={handleLogout}>
                   <RiLogoutBoxLine color="red" />
                  Logout
               </Button>
                
                </DropdownMenuItem>

              </DropdownMenuGroup>
              {/* <DropdownMenuSeparator /> */}
              
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
