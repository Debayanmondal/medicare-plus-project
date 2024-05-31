import "./env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import api from "./routes/index.js";
import path from "path";

const app = express();

// const { USER_NAME, PASSWORD } = process.env;
const uri = "mongodb+srv://debayanmondal2001:Debamongo1@medical.hfpyths.mongodb.net/MedCare?retryWrites=true&w=majority&appName=Medical";
//use the following uri when running local MongoDB server
// const uri = "mongodb://localhost:27017/MedCare";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

// app.use(express.static("public"));

app.use(express.json());
const __dirname = path.dirname("")
const buildpath = path.join(__dirname,"../medcare/build")
app.use(express.static(buildpath));

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.use("/api", api);

//process.env.PORT ||

const port =  5000;

app.listen(port, function () {
  console.log("Server started on port: ", port);
});
