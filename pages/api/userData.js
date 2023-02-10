const User = require("../../models/user")
const jwt = require("jsonwebtoken")
const dbConnect = require("../../utils/connectDB")

export default async function handler (req, res) {
    await dbConnect()
    if(req.method === "POST"){
        const cookieExist = req.body.cookieExist

        jwt.verify(cookieExist, process.env.jwtSecret, async (err, user) => {
            if(err){
               
                return res.send("Token is not Valid")
            }
            const userData = await User.findById(user.id).populate({ path: "courses", match: { courses: { $exists: true }}})
            if(!userData){
                return res.send("User not exists")
            }
            res.send(userData)
        })
    }
    
    else if(req.method === "PUT"){
        const {user, plab2, prevAttempt, phone} = req.body
        console.log(plab2, prevAttempt, phone)
        if(plab2 === undefined){
            const findUser = await User.findByIdAndUpdate(user._id, 
                {
                    $set: {
                        prevPlab2Attempts: prevAttempt,
                        phone: phone
                    }
                })
            console.log(findUser)
            res.send("User updated Successfully", findUser)
        }
        else{
            const findUser = await User.findByIdAndUpdate(user._id, 
                {
                    $set: {
                        plab2Date: plab2,
                        prevPlab2Attempts: prevAttempt,
                        phone: phone
                    }    
                })
            console.log(findUser)
            res.send("User updated Successfully", findUser)
        }
    }
}