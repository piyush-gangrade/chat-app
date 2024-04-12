import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoute.js";
import { connect_db } from "./database.js";

const app = express();
const port = 8800;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/auth", authRouter);

connect_db();

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
} )