//create a middleware function - 
// check if a token exist - that is a user is logged in
// verify the token and pass a functioanlity to the function using middleware

const jwt = require("jsonwebtoken")

function auth( req, res, next ){

    //This checks if a token exist
    const token = req.header("x-auth-token")
    if (!token) return res.status(401).send ("Not authorized...")

    try{
        const secretKey = process.env.SECRET_KEY
        const payload = jwt.verify(token, secretKey)
        req.user = payload;
        next();
    }catch(error){
            res.status(400).send("Invalid token")
    }

}


module.exports = auth