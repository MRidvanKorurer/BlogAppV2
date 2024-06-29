const express = require("express");
const {register, login, me, index} = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");


const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me",authMiddleware, me);

router.get("/index", index)



module.exports = router;