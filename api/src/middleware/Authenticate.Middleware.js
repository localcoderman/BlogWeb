import jwt from "jsonwebtoken"
export const Authenticate = async (req , res , next)=>{
    try {
        const token = req.cookies.AccessToken
        if(!token){
           return next(403 , "unAuthorized Access")
        }
    
        const decodeToken = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decodeToken
        next()
    } catch (error) {
        next(500 , error.message)
    }
}