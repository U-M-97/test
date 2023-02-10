import dbConnection from "../../../utils/connectDB";
const passport = require("passport")
import "../../../utils/passport"

export default async function handler(req, res, next) {
    await dbConnection()
    passport.authenticate('facebook', { scope: ['email']} )
    (req,res,next)
}