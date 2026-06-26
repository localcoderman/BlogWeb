import "dotenv/config"
import app from "./app.js"
import http from "http"

const server = http.createServer(app)

const PORT =process.env.PORT || 5000


server.listen(PORT,(e)=>{
    console.log("Server is Listen on this",PORT);
    
})