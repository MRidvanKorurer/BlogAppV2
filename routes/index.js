const express = require("express");
const {register, login, me} = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");


const router = express.Router();





module.exports = router;