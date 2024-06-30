const express = require("express")
const {bookGet, bookGetid, bookPost, bookDelete, bookPut} = require("../controllers/book")


const router = express.Router();


router.get("/",bookGet);

router.get("/:id",bookGetid);

router.post("/",bookPost);

router.delete("/:id",bookDelete);

router.put("/:id", bookPut);


module.exports = router;