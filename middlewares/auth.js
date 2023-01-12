import jwt from 'jsonwebtoken'

const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        let decodeData = jwt.verify(token,process.env.JWT_SECRET); //to check if token is valid or not.
        req.userId = decodeData?._id;        
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;

//we will if the request received from the client has a token or not and the it is valid or not.