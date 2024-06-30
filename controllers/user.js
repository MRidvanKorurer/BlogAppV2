const User = require("../models/auth")

const userGet = async(req,res)=>{
    try {
        const user = await User.find();
        res.status(200).render('books', { books });
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
        
}

const userGetid = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ hata: "kullanıcı bulunamadı" });
        }
        res.status(200).render('user', { user });
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}


const userDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Book.findOneAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ hata: "kullanıcı bulunamadı" });
        }
        res.status(200).redirect('/users'); 
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const userPut = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true });

        if (!user) {
            return res.status(404).json({ hata: "Kullanıcı bulunamadı" });
        }
        res.status(200).redirect(`/users/${id}`);
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}


module.exports={userGet,userGetid,userDelete,userPut}