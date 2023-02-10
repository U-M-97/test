const jwt = require("jsonwebtoken")

function verifyToken(req, role){
    const token = req.cookies.token
    if(!token){
      return "Token is not Present"
    }

    let isToken

    if(role === "client"){
        jwt.verify(token, process.env.jwtSecret, async (err, user) => {
            if(err){
                return isToken = false
            }
            return isToken = true
        })
    
        if(!isToken){
            return "Token is not Valid"
        }
    
        return "Allowed"
    } 

    else if(role === "admin"){
        jwt.verify(token, process.env.jwtAdminSecret, async (err, user) => {
            if(err){
                return isToken = false
            }
            return isToken = true
        })
    
        if(!isToken){
            return "Token is not Valid"
        }
    
        return "Allowed"
    }

    
}


module.exports = verifyToken