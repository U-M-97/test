const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
    const { paymentType } = req.body

    if(req.method === "POST"){

        if(paymentType === "Course Payment"){
            const { user, selectedCourse, coupon } = req.body
            const userId = user._id
            const courseId = selectedCourse._id
            const transformedItems = [{   
                quantity: 1,
                price_data: {
                    currency: "gbp",
                    unit_amount: selectedCourse.price * 100,
                    product_data: {
                        name: selectedCourse.title, 
                        images: [selectedCourse.image],
                        description: selectedCourse.description,
                    }
                }
            }]
    
            try{
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: transformedItems,
                    mode: "payment",
                    invoice_creation: {enabled: true},
                    success_url:`${req.headers.origin}/paymentSuccessfull?CoursePayment`,
                    cancel_url: `${req.headers.origin}/paymentUnsuccessfull`,
                    metadata: {userId, courseId, coupon, paymentType},
                })
                res.status(200).json({ id: session.id })
            }catch(err){
                res.status(err.statusCode || 500).json(err.message);
            }
        }

        else if(paymentType === "Room Payment"){
            const { payment, user, bookingId, roomId } = req.body
            const userId = user._id

            const transformedItems = [{
                quantity: 1,
                price_data: {
                    currency: "gbp",
                    unit_amount: payment * 100,
                    product_data: {
                        name: "Room Booking", 
                        // images: [selectedCourse.image],
                        description: "Payment for Room Booking",
                    }
                }
            }]

            try{
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: transformedItems,
                    mode: "payment",
                    invoice_creation: {enabled: true},
                    success_url:`${req.headers.origin}/paymentSuccessfull?=RoomPayment`,
                    cancel_url: `${req.headers.origin}/paymentUnsuccessfull`,
                    metadata: {userId, roomId, bookingId, paymentType},
                })
                res.status(200).json({ id: session.id })
            }catch(err){
                res.status(err.statusCode || 500).json(err.message);
            }
        }
    }
}