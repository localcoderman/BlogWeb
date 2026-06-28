import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/Layout/Layout";
import { RouteIndex, RouteProfile, RouteSignin, RouteSignup } from "./helpers/RouteName";
import Index from "./Pages/Index";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
          <Route path={RouteProfile} element={<Profile/>}></Route>

        </Route>
        <Route path={RouteSignin} element={<Signin/>}/>
        <Route path={RouteSignup} element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
