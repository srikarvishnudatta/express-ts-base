import express from "express";
import {config} from "dotenv";
import authRouter from "./routes/auth.router";
import { errorHandler } from "./middleware/errorHandler";
import groupRouter from "./routes/group.router";
// import cookieParser from "cookie-parser";
// import cors from "cors";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({origin: "http://localhost:5173"}));
// app.use(cookieParser())

const PORT = process.env.PORT || 4000

// routes
app.use("/auth", authRouter);

// add the token verification and extraction user_id, session_id?.
app.use("/group", groupRouter);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log("listening on PORT:", PORT); 
});



