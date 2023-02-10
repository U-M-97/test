const nodemailer = require("nodemailer")

export default async function handler(req,res){
    if(req.method === "POST"){

        const  reqType  = req.body.reqType

        if(reqType === "Contact Email"){

            const {name,email,subject,message} = req.body.inputs

            const output = `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Subject: ${subject}</p>
                <p>Message: ${message}</p>
            `
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
                from: {name: name, address: `${email}`},
                to: "team@friendsacademy.co.uk",
                subject: subject,
                html: output
            }
            console.log(mailOptions)

            transporter.sendMail(mailOptions, (err,info) => {
                if(err){
                    console.log(err)
                    res.send("Failed")
                }else{
                    console.log("Email Sent")
                    res.send("Email Sent")
                }
            })
        }

        else if(reqType === "Course Request"){

            const email = req.body.email
            const course = req.body.course

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
                from: {name: "Booking Request", address: `${email}`},
                to: "team@friendsacademy.co.uk",
                subject: "Booking Request",
                text: `${email} requested for ${course} Booking`
            }

            transporter.sendMail(mailOptions, (err,info) => {
                if(err){
                    console.log(err)
                    res.send("Failed")
                }else{
                    console.log("Email Sent")
                    res.send("Email Sent")
                }
            })
        }
    }
}