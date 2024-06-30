const express = require("express")
const {bookGet, bookGetid, bookPost, bookDelete, bookPut} = require("../controllers/book")


const router = express.Router();


router.get("/book",bookGet);

router.get("/book/:id",bookGetid);

router.post("/book",bookPost);

router.delete("/book/:id",bookDelete);

router.put("/book/:id", bookPut);


module.exports = router;