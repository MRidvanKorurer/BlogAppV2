const Book = require("../models/book");


const indexPage = async (req, res) => {
    try {
        res.status(200).render('index');
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const bookSearch = async (req, res) => {
    try {
        res.status(200).render('bookSearch');
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const bookGet = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).render('bookList', { books });
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const bookGetid = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ hata: "Kitap bulunamadı" });
        }
        res.status(200).render('singleBlog', { book });
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}



const bookPost = async (req, res) => {
    try {
        const book = new Book({
            baslik: req.body.baslik,
            altbaslik: req.body.altbaslik,
            aciklama: req.body.aciklama,
        });
        // Burada veritabanına kaydetme işlemini yapabilirsiniz
         await book.save();

        res.status(201).send(`Kitap başarıyla kaydedildi: ${JSON.stringify(book)}`);
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
};

const bookPostGet = async (req, res) => {
    try {
        return res.status(200).render("bookCreate");
    } catch (error) {
        return res.status(400).json({ hata: error.message });
    }
};


const bookDeleteGet = async (req, res) => {
   try{
        res.status(200).render('bookDelete'); 
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const bookDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findOneAndDelete({ _id: id });

        if (!book) {
            return res.status(404).json({ hata: "Kitap bulunamadı" });
        }
        res.status(200).redirect('/'); 
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const bookPut = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true });

        if (!book) {
            return res.status(404).json({ hata: "Kitap bulunamadı" });
        }
        res.status(200).redirect(`/${id}`);
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const bookPutGet = async (req, res) => {
    try {
        res.status(200).render("bookEdit");
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

module.exports = { bookGet, bookGetid, bookPost, bookDelete, bookPut, indexPage, bookPostGet, bookDeleteGet, bookPutGet, bookSearch };
