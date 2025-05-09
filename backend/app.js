const express = require("express")
const app = express();
require("dotenv").config();
require("./conn");
const cors = require("cors");
const UserAPI = require("./router/user");
const TaskAPI = require("./router/taskRoute");

app.use(cors());
app.use(express.json());

//Localhost:8080/api/v1/sign-in
app.use("/api/v1", UserAPI);
//Localhost:8080/api/v2
app.use("/api/v2", TaskAPI);

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log("server start")
});