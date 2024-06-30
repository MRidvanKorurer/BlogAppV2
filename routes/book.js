const express = require("express")
const {bookGet, bookGetid, bookPost, bookDelete, bookPut, indexPage, bookPostGet} = require("../controllers/book")


const router = express.Router();


router.get("/getAll",bookGet);

router.get("/home", indexPage);

router.get("/single/:id",bookGetid);

router.post("/create",bookPost);

router.get("/create", bookPostGet);

router.delete("/delete/:id",bookDelete);

router.put("/update/:id", bookPut);


module.exports = router;