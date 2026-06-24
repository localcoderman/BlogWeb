import React from "react";
import textlogo from "@/assets/images/textLogo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import SearchBox from "./SearchBox";
import { RouteIndex, RouteSignin } from "@/helpers/RouteName";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white border-b px-5">
      <div className="w-60">
        <Link to={RouteIndex}><img src={textlogo} alt="" /></Link>
      </div>
      <div className="w-[500px] boder-none">

<SearchBox/>

      </div>
      <div>
        <Button asChild  className="rounded-full">
          <Link to={RouteSignin}>
            <PiSignIn />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
