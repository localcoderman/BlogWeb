import jwt from "jsonwebtoken";
export const onlyAdminAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      return next(403, "unAuthorized Access");
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodeToken.role === "admin") {
      req.user = decodeToken;

      next();
    } else {
      return next(404, "unAuthorized Access");
    }
  } catch (error) {
    next(500, error.message);
  }
};
