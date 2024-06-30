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
    try {
        const bookId = req.params.id; // URL'de bir ID olduğundan varsayıyoruz
        const book = await getBookById(bookId);
    
        if (!book) {
          return res.status(404).json({ message: "Kitap bulunamadı" });
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
    try {
        const bookId = req.params.id; // URL'den ID'yi alın
        const { baslik, altbaslik } = req.body; // Gövdeden başlık ve alt başlığı alın
    
        // Verileri güncellemek için kitap modelinizi kullanın
        const updatedBook = await updatedBook(bookId, { baslik, altbaslik });
    
        if (!updatedBook) {
          return res.status(404).json({ message: "Kitap bulunamadı" });
        }
        //res.status(200).redirect(`/${id}`);
        //res.status(200).render('bookList', { books });
        res.status(200).redirect(`/books/${bookId}`);

    } catch (error) {
        // Hata durumunda JSON formatında hata mesajı döndür
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
