import mongoose from "mongoose";
import { DB_Name } from "../constants/DB_Name.js";

const DB_connection = async ()=>{
    const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_Name}`)
    console.log(`MongoDB Connected Successfully: ${connectionInstance.connection.host}`)


    try {
        
    } catch (error) {
        console.error("connection Error : ",error);
        process.exit(1)
        
    }
}

export default DB_connection