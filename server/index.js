import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import postRoutes from "./routes/posts.js"

// https://git.heroku.com/blogify-backend-de.git
// https://blogify-backend-de.herokuapp.com/
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", (req,res) => {
    res.json({
        author: "coding with semih :))",
        message: "Happy new year"
    })
})

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 7000;



mongoose
.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
   app.listen(process.env.PORT, () => {
       console.log(`Server is running on port: ${process.env.PORT}`);
   })
})
.catch((error) => {
    console.error(error.message);
})