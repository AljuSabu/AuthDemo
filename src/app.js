import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import crypto from "crypto"

const app = express();

//Middlewares
app.use(cors()); //It allows to interact with the client which is loaded in different domain
app.use(express.json()); //Instructs the app to accept the data in json format
app.use(express.urlencoded({ extended: true })); //Instructs the app to accept data in the url encoded format as well
app.use(morgan("dev")); //Logs requests, errors and more to the console
app.use(cookieParser()); // It allows the server to access the cookies

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>App is running</h1>");
});

//Crypto key
// let key =crypto.randomBytes(64).toString('hex')
// console.log(key);

export default app;
