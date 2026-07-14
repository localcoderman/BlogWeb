export const RouteIndex = "/";
export const RouteSignin = "/sign-in";
export const RouteSignup = "/sign-up";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/category/edit/${category_id}`;
  } else {
    return "/category/edit/:category_id";
  }
};

export const RouteBlog = "/blog";
export const RouteBlogAdd = "/blog/add";
export const RouteBlogEdit = (blog_id) => {
  if (blog_id) {
    return `/blog/edit/${blog_id}`;
  } else {
    return "/blog/edit/:blog_id";
  }
};

export const RouteBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return "/blog/:category/:blog";
  } else {
    return `/blog/${category}/${blog}`;
  }
};

export const RouteBlogByCategory = (category) => {
  if (!category) {
    return "/blog/:category";
  } else {
    return `/blog/${category}`;
  }
};
export const RouteSearch = (q) => {
  if (q) {
    return `/search?q=${q}`;
  } else {
    return `/search`;
  }
};

export const RouteCommentDetails = "/comments"
export const RouteUser = "/users"
export const RouteAbout = "/about-us"


