const mongoose = require("mongoose");

const conn = async() =>{
    try{
       const response = await mongoose.connect
       (`${process.env.MONGO_URL}`);
       if(response){
        console.log("connected to database");
       }
       
    }
    catch(error){
        console.log(error);
    }
};

conn();
