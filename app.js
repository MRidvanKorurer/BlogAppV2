const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db/connect");
const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");


dotenv.config();



const app = express();
const port = process.env.PORT || 5000


// middlewares
app.set("view engine", "ejs");
app.use(express.json());


// routing
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);


app.listen(port, () => {
    conn();
    console.log("Server is running on port " + port);
})
