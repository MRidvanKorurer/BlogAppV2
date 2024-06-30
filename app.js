const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db/connect");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/book");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

dotenv.config();



const app = express();
const port = process.env.PORT || 5000


// middlewares
app.set("view engine", "ejs");
app.use(express.json());

//var options = {explorer: true};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// routing
app.use("/api/auth", authRoute);
app.use("/api/book",bookRoute)


app.listen(port, () => {
    conn();
    console.log("Server is running on port " + port);
})
