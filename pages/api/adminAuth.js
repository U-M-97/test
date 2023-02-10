const Admin = require("../../models/admin")
const dbConnect = require("../../utils/connectDB")
const jwt = require("jsonwebtoken")
const setCookies = require("cookies-next").setCookie

export default async function handler(req, res){
    await dbConnect()
    
    if(req.method === "POST"){
        const { username, password } = req.body
        const isAdmin = await Admin.findOne({name: username, password: password})
        if(isAdmin){
            const token = jwt.sign(
                {
                  id: isAdmin._id,
                  role: "admin",
                  created: Date.now().toString(),
                },
                process.env.jwtAdminSecret,
                {expiresIn: "1d"}
            )
    
            const assignToken = await Admin.findOneAndUpdate({_id: isAdmin._id}, {token: token})
    
            setCookies("token", token, {
                req,
                res,
                maxAge: 24 * 60 * 60
            })
    
            const {password, ...others} = assignToken._doc
            res.send(others)
        }else{
            res.send("Invalid Credentials")
        }
    }
    else if(req.method === "GET"){
        const cookie = req.query.cookieExist
        const checkCookie = await Admin.findOne({token: cookie})
        if(checkCookie){
            const {password, ...others} = checkCookie._doc
            res.send(others)
        }else{
            res.send("Cookie not exists")
        }
    }
    

}