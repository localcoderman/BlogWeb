import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/Layout/Layout";
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSignin, RouteSignup } from "./helpers/RouteName";
import Index from "./Pages/Index";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import CategoryDetails from "./Pages/Category/CategoryDetails";
import AddBlog from "./Pages/Blog/AddBlog";
import EditBlog from "./Pages/Blog/EditBlog";
import BlogPageDetails from "./Pages/BlogPageDetails";
import BlogDetails from "./Pages/Blog/BlogDetails";
import BlogByCategory from "./Pages/Blog/BlogByCategory";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
          <Route path={RouteProfile} element={<Profile/>}></Route>

          {/* Category Routes  */}

          <Route path={RouteAddCategory} element={<AddCategory/>}></Route>
          <Route path={RouteEditCategory()} element={<EditCategory/>}></Route>
          <Route path={RouteCategoryDetails} element={<CategoryDetails/>}></Route>

          {/* Blog Routes  */}
          <Route path={RouteBlogAdd} element={<AddBlog/>}></Route>
          <Route path={RouteBlogEdit()} element={<EditBlog/>}></Route>
          <Route path={RouteBlog} element={<BlogDetails/>}></Route>
          <Route path={RouteBlogDetails()} element={<BlogPageDetails/>}></Route>
          <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}></Route>






        </Route>
        <Route path={RouteSignin} element={<Signin/>}/>
        <Route path={RouteSignup} element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
