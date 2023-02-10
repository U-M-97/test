import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { loadStripe } from '@stripe/stripe-js'

const MakeAPayment = () => {

    const stripePromise = loadStripe(process.env.stripe_public_key)
    const [ reqApi, setReqApi ] = useState(false)
    const router = useRouter()
    const user = useSelector((state) => state.user.currentUser)
    const [ bookingId, setBookingId ] = useState()
    const [ bookingVerified, setBookingVerified ] = useState()
    const [ verifyButton, setVerifyButton ] = useState(true)
    const [ payment, setPayment ] = useState(null)
    const [ roomId, setRoomId ] = useState()

    useEffect(() => {
      if(!user){
        router.push("/account/login")
      }
    }, [])

    const handleVerify = async () => {
        setReqApi(true)
        try{
          const res = await axios.get(`${process.env.url}/clientRoomBooking`, { params: { id: bookingId }})
          console.log(res.data)
          if(res.data === "Booking is not available"){
            setBookingVerified(false)
            setReqApi(false)
          }else{
            setRoomId(res.data._id)
            setPayment(res.data.roomMembers[0].payment)
            setBookingVerified(true)
            setReqApi(false)
            setVerifyButton(false)
          }
        }catch(err){
          setReqApi(false)
        }
    }

    const handlePay = async () => {
      if(payment != null){
        const stripe = await stripePromise
        const res = await axios.post(`${process.env.url}/checkout_sessions`, {paymentType: "Room Payment", payment, roomId, bookingId, user}) 
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.id
        })
      }
    }

  return (
    <div className="h-96 mt-10 font-main">
        <div className="flex flex-col items-center justify-center ">
            <h1 className="font-bold text-xl">Enter your Booking ID here</h1>
            <input className="px-5 py-3 rounded-md mt-5 w-96 border" onChange={(e) => setBookingId(e.target.value)}/>
            { reqApi === false && verifyButton === true ? <button className='mt-5 bg-green font-bold w-40 py-2 rounded-md text-xl hover:bg-greenHover' onClick={handleVerify}>Verify</button> 
            : reqApi === true ? <div className='mt-5'>
                <CircularProgress/>
            </div> : null }
            { bookingVerified === true ? 
              <div className='mt-2 flex flex-col items-center justify-center'>
                 <Alert severity="success" style={{fontSize: "large", width: "250px", display: "flex", alignItems: "center", justifyContent: "center"}} className="mt-2 w-full">Booking Verified!</Alert>
                 <p className='text-2xl mt-3'>Your Total Payment is £{payment}</p>
                 <button className='text-2xl mt-5 bg-green px-5 py-2 font-bold rounded-md hover:bg-greenHover' onClick={handlePay}>Pay £{payment}</button>
              </div>
           :  bookingVerified === false ? 
              <div className='mt-2'>
                <Alert severity="error" style={{fontSize: "large"}} className="mt-2 w-full">Booking is not available</Alert>
              </div> : null }
        </div> 
    </div>
  )
}

export default MakeAPayment