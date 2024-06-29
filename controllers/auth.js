const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const createJwtToken = require("../utils/createJwtToken");


const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = await Auth.findOne({email});

        if(user) {
            return res.status(400).json({
                message: "Email adresi zaten kayıtlı"  //404.html gönderilecek!
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await Auth.create({username, email, password: hashPassword});


        const token = createJwtToken(newUser);

        return res.status(201).render("success", {
            message: "Kayıt işlemi başarılı",
            newUser,
            token
        })


    } catch (error) {
        return res.status(400).json({
            message: "Kayıt işlemi başarısız"
        })
    }
}



const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Auth.findOne({email});

        if(!user) {
            return res.status(400).render("failed", {
                message: "Email adresi hatalı",
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword) {
            return res.status(400).render("failed", {
                message: "Parola hatalı",
            })
        }

        const token = createJwtToken(user);

        return res.status(200).render("success", {
            message: "Giriş işlemi başarılı",
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: "Giriş işlemi başarısız"
        })
    }
}


const me = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).render("success", {
            message: "İşlem Başarılı",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: "İşlem başarısız"
        })
    }
}



const index = async (req, res) => {
    try {
        const data = Math.floor(Math.random() * 71);
        return res.render("index", {
            message: "asdas",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: "İşlem başarısız"
        })
    }
}

module.exports = {register, login, me, index};