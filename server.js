const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db/db");
const urlRoutes =
require("./routes/urlRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
"/api",
urlRoutes
);

app.get("/test",(req,res)=>{
    res.json({
        message:"Server running"
    });
});

app.get("/db-test", async(req,res)=>{
    try{
        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json({
            success:true,
            time:result.rows[0]
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false
        });

    }
});

app.listen(
    process.env.PORT,
    ()=>{
        console.log(
            "Server started"
        );
    }
);