const express = require("express");
const { userGet, userGetid, userDelete, userPut } = require("../controllers/user");


const router = express.Router();


router.get("/user" ,userGet);

router.get("/user/:id",userGetid);

router.delete("/user/:id",userDelete);

router.put("/user/:id",userPut);


module.exports = router;