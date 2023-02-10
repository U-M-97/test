const Room = require("../../models/room")
const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
const dayjs = require("dayjs")
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

const nodemailer = require("nodemailer")

export default async function handler (req, res) {
   
    await dbConnect()
    const role = "admin"
    const tokenCheck = await verifyToken(req, role)
    
    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
        if(req.method === "POST"){

            try{
                const { id, roomImage, roomTitle, roomType, roomBeds } = req.body
                console.log(roomBeds)
                const findRoom = await Room.findByIdAndUpdate(id,{
                    image: roomImage,
                    roomTitle: roomTitle,
                    roomType : roomType,
                    roomBeds: roomBeds
                })
    
                if(findRoom === null){
                    const newRoom = await new Room({
                        image: roomImage,
                        roomTitle: roomTitle,
                        roomType : roomType,
                        roomBeds: roomBeds
                    })
                    newRoom.save()
                    res.send(newRoom)
                }else{
                    res.send(findRoom)
                }  
            }catch(err){
            res.send(err)
            }  
        }
        else if(req.method === "GET"){
            const rooms = await Room.find()
            res.send(rooms)
        }else if (req.method === "DELETE"){

            if(req.body.reqMethod === "Delete Booking"){
            
                const {roomId, memberId} = req.body
                const deleteMember = await Room.findOneAndUpdate({_id: roomId}, {
                    $pull: { 
                        roomMembers: {
                            _id: memberId
                        }
                    }
                })
                console.log(deleteMember)
                if(deleteMember){
                    res.send("Booking Deleted Successfully")
                }
            }else if(req.body.reqMethod === "Delete Room"){
                const id = req.body.id
                console.log(id)
                const deletedRoom = await Room.findByIdAndDelete(id)
                if(deletedRoom){
                    res.send("Room Deleted Successfully")
                }
            }  
        }else if(req.method === "PUT"){
            try{
                const {roomId, memberId, name, gender, phone, country, email, checkIn, checkOut, bed, payment } = req.body.inputs
                const id = req.body.id
                const reqMethod = req.body.reqMethod
        
                if(reqMethod === "Add Member"){

                    const findRoom = Room.findById(roomId, async (error, room) => {
                        try{
                            if(room){
                                const isBooked = room.roomMembers.find((member) => {
                                    console.log(dayjs(member.checkIn).isBetween(dayjs(checkIn), dayjs(checkOut)))
                                    if(dayjs(member.checkIn).isBetween(dayjs(checkIn), dayjs(checkOut)) || dayjs(member.checkOut).isBetween(dayjs(checkIn), dayjs(checkOut)) || dayjs(checkIn).isBetween(dayjs(member.checkIn), dayjs(member.checkOut) || dayjs(checkOut).isBetween(dayjs(member.checkIn), dayjs(member.checkOut)))){
                                        return member
                                    }
                                })
                          
                                if(isBooked === undefined){
                                    
                                    const updateRoom = await Room.findByIdAndUpdate({_id: roomId}, {
                                        $push: {
                                            roomMembers: {
                                                name: name,
                                                gender: gender,
                                                phone: phone,
                                                country: country,
                                                email: email,
                                                checkIn: checkIn,
                                                checkOut: checkOut,
                                                bed: bed,
                                                payment: payment,
                                            }
                                        }
                                    }, { new: true })
                                
                                    if(email.length !== 0){
                                        console.log("running")
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            auth: {
                                                user: process.env.email,
                                                pass:process.env.pass
                                            }
                                        })
        
                                        let mailOptions = {
                                            from: "team@friendsacademy.co.uk",
                                            to: email,
                                            subject: "Room Booking",
                                            text: `Your Room is booked successfully. You can pay now by adding your booking ID ${updateRoom.roomMembers[updateRoom.roomMembers.length - 1]._id} in Make a Payment option on our Website`,
                                            html: `
                                                <p style="font-size: medium">Your Room is booked successfully. You can pay now by adding your booking ID</p> <h1 style="font-size: bold">${updateRoom.roomMembers[updateRoom.roomMembers.length - 1]._id}</h1> <p style="font-size: medium"> in Make a Payment option on our Website</p>
                                            `
                                        }
        
                                        transporter.sendMail(mailOptions, (err,info) => {
                                            if(err){
                                                console.log(err)
                                                res.send("Email Failed to send")
                                            }else{
                                                console.log("Email Sent")
                                                res.send("Booking Added Successfully")
                                            }
                                        })
                                    } else{
                                        res.send("Booking Added Successfully")
                                    }     
                                }else{
                                    res.send("Dates Already Booked")
                                }
                            }
                        }catch(err){
                            res.status(500).send({ error: err.message })
                        }
                    })
                }

                else if(reqMethod === "Update Member"){
                    console.log(memberId)
                    const updateData = {
                        name: name,
                        gender: gender,
                        phone: phone,
                        country: country,
                        email: email,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        bed: bed,
                        payment: payment
                    }
                    const updateRoomMember = await Room.findOneAndUpdate({$and: [{_id: roomId}, {'roomMembers._id' : memberId}]}, {
                        $set: {
                            'roomMembers.$': updateData
                        } 
                    })
                    res.send("Member Updated Successfully")
                }
            }catch(err){
                res.send(err)
            }
        }
    }    
}