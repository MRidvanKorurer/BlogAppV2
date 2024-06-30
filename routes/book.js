const express = require("express")
const {bookGet, bookGetid, bookPost, bookDelete, bookPut, indexPage, bookPostGet, bookDeleteGet, bookPutGet, bookSearch} = require("../controllers/book")


const router = express.Router();


router.get("/getAll",bookGet);

router.get("/search",bookSearch);

router.get("/home", indexPage);

router.get("/single/:id",bookGetid);

router.get("/create", bookPostGet);

router.post("/create",bookPost);

router.get("/delete/:id", bookDeleteGet);

router.post("/delete/:id",bookDelete);

router.get("/edit", bookPutGet);

router.put("/edit/:id", bookPut);


module.exports = router;