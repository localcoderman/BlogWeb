import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/Layout/Layout";
import { RouteAbout, RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignin, RouteSignup, RouteUser } from "./helpers/RouteName";
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
import SearchResults from "./Pages/SearchResults";
import CommentDetails from "./Pages/CommentDetails";
import UserDetails from "./Pages/UserDetails";
import AuthRouteProtection from "./components/AuthRouteProtection";
import AdminAllowed from "./components/AdminAllowed";
import AboutPage from "./Pages/About";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
      



         

         

          {/* Blog Routes  */}
         
          <Route path={RouteBlogDetails()} element={<BlogPageDetails/>}></Route>
          <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}></Route>
          <Route path={RouteSearch()} element={<SearchResults/>}></Route>
          <Route path={RouteAbout} element={<AboutPage/>}></Route>




          <Route element={<AuthRouteProtection/>}>
          <Route path={RouteProfile} element={<Profile/>}></Route>
          <Route path={RouteCommentDetails} element={<CommentDetails/>}></Route>
         
          
          </Route>

            <Route element={<AdminAllowed/>}>
           <Route path={RouteAddCategory} element={<AddCategory/>}></Route>
          <Route path={RouteEditCategory()} element={<EditCategory/>}></Route>
          <Route path={RouteCategoryDetails} element={<CategoryDetails/>}></Route>
          <Route path={RouteUser} element={<UserDetails/>}></Route>
            <Route path={RouteBlogAdd} element={<AddBlog/>}></Route>
          <Route path={RouteBlogEdit()} element={<EditBlog/>}></Route>
          <Route path={RouteBlog} element={<BlogDetails/>}></Route>

          
          </Route>



        </Route>
        <Route path={RouteSignin} element={<Signin/>}/>
        <Route path={RouteSignup} element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
