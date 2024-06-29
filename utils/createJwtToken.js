const jwt = require("jsonwebtoken");


const createJwtToken = (user) => {
    const token = jwt.sign({sub: user._id, name: user.username}, process.env.JWT_KEY, {
        expiresIn: "7d",
        algorithm: "HS512"
    })

    return token;
}


module.exports = createJwtToken;