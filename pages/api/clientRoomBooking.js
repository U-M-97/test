const Room = require("../../models/room")
const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
const mongoose = require("mongoose")

export default async function handler(req, res){
    
    await dbConnect()
    const role = "client"
    const tokenCheck = await verifyToken(req, role)

    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
        if(req.method === "GET"){
            
            const roomMemberId =  mongoose.Types.ObjectId(req.query.id);

            try{
                const booking = await Room.aggregate([{ $match: {"roomMembers" : { $elemMatch: {_id: roomMemberId}}}}, {
                    $project: {
                        roomMembers: 1,
                        roomMembers: {
                            $filter: {
                                input: '$roomMembers',
                                as: 'roomMember',
                                cond: { $eq: ['$$roomMember._id', roomMemberId] }
                            }
                        }
                    }
                }
                ])
                if(booking.length !== 0){
                    res.send(booking[0])
                }else{
                    res.send("Booking is not available")
                }
                
            }catch(err){
                console.log(err)
                res.status(500).send({error: err.message})
            }
        }
    }
}