import {User} from "../Models/user.model.js"
import { ErrorHandler } from "../Utils/HandleError.js";

export const getUser = async(req,res,next)=>{
try {
    const {userid} = req.params;
    const user = await User.findById({_id : userid}).lean().exec()
    if(!user){
        next( new ErrorHandler(401,"user.found"))
    }
    res.status(200).json({
        success:true,
        message:"User data found",
        user
    })
} catch (error) {
    next( new ErrorHandler(401,error.message))
}
} 


export const updateUser = async(req, res, next)=>{

    try {

       const {}
        res.status(200).json({
        success:true,
        message:"Data updated",
        
    })
        

} catch (error) {
    next( new ErrorHandler(401,error.message))
}
}