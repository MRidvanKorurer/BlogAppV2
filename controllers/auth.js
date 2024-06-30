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
/**
 * @swagger
 * /api/auth/index:
 *   get:
 *     summary: Ana sayfa veri getirme
 *     description: Rastgele bir sayı üreterek ve mesaj göndererek index sayfasını render eder.
 *     responses:
 *       200:
 *         description: İşlem başarılı, index sayfası render edildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: asdas
 *                 data:
 *                   type: integer
 *                   example: 42
 *       400:
 *         description: İşlem başarısız
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: İşlem başarısız
 */
const index = async (req, res) => {
    try {
        const data = Math.floor(Math.random() * 71);

        return res.render("blogCreate", {
            message: "asdas",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: "İşlem başarısız"
        });
    }
}

module.exports = {register, login, me, index};