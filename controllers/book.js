const Book = require("../models/book");


const indexPage = async (req, res) => {
    try {
        res.status(200).render('index');
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


// const bookPost = async (req, res) => {
//     try {
//         let existingBook = await Book.findOne({ baslik: req.body.baslik });
//         if (existingBook) {
//             return res.status(400).json({ hata: "Bu başlığa sahip bir kitap zaten var" });
//         }

//         let book = new Book({
//             baslik: req.body.baslik,
//             altbaslik: req.body.altbaslik,
//             aciklama: req.body.aciklama
//         });

//         await book.save();
//         res.status(201).redirect('/books');
//     } catch (error) {
//         res.status(400).json({ hata: error.message });
//     }
// }


const bookPost = async (req, res) => {
    try {
        const book = new Book({
            baslik: req.body.baslik,
            altbaslik: req.body.altbaslik,
            aciklama: req.body.aciklama,
            resim: req.file ? req.file.filename : ''
        });
        // Burada veritabanına kaydetme işlemini yapabilirsiniz
         await book.save();

        res.status(200).send(`Kitap başarıyla kaydedildi: ${JSON.stringify(book)}`);
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
};

const bookPostGet = async (req, res) => {
    try {
        return res.status(200).render("/bookCreate");
    } catch (error) {
        return res.status(400).json({ hata: error.message });
    }
};

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
        const updatedBook = await updateBookById(bookId, { baslik, altbaslik });
    
        if (!updatedBook) {
          return res.status(404).json({ message: "Kitap bulunamadı" });
        }
        res.status(200).redirect(`/${id}`);
    } catch (error) {
        // Hata durumunda JSON formatında hata mesajı döndür
        res.status(400).json({ hata: error.message });
    }
}

module.exports = { bookGet, bookGetid, bookPost, bookDelete, bookPut, indexPage, bookPostGet };
