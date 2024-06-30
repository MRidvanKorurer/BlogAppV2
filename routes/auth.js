const express = require("express");
const {register, login, me, registerGet, loginGet} = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");


const router = express.Router();

router.get("/register", registerGet);

router.post("/register", register);

router.get("/login", loginGet);

router.post("/login", login);

router.get("/me",authMiddleware, me);





module.exports = router;