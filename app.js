const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db/connect");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/book");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();


 
const app = express();
const port = process.env.PORT || 5000


// middlewares
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

//var options = {explorer: true};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// routing
app.use("/auth", authRoute);
app.use("/book",bookRoute);


app.listen(port, () => {
    conn();
    console.log("Server is running on port " + port);
})
