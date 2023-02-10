import { Password } from "@mui/icons-material"

const User = require("../../models/user")

export default async function handler (req, res){
    try{
        const extraction = ["_id" , "image", "username", "rating", "review"]
        const reviews = await User.find({review: {$ne: null}, rating: {$ne: null}}).select(extraction)
        res.send(reviews) 
    }catch(err){
        res.send(err)
    }
}