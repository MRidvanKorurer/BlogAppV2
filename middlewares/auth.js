const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");


const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(401).render("error", {
            message: "Token Error"
        })
    }

    jwt.verify(token, process.env.JWT_KEY, async(err, decoded) => {
        if(err) {
            return res.status(401).render("error", {
                message: "Token Error"
            })  
        }

        const user = await Auth.findById(decoded.sub);

        if(!user) {
            return res.status(401).render("error", {
                message: "Token Error"
            })
        }

        req.user = user;

        next();
    })
}

module.exports = authMiddleware;