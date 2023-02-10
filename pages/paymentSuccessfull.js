import Link from "next/link"
import { useEffect, useState } from "react"

const PaymentSuccessfull = () => {

  const [ text, setText ] = useState()
  const params = window.location.search

  useEffect(() => {
    if(params == "?CoursePayment"){
      setText("Booking")
    }else if(params == "?RoomPayment"){
      setText("Room Booking")
    }
  }, [])

  return (
    <>
    {text && 
    <div className="flex flex-col items-center justify-center mt-20 font-main">
        <h1 className="text-6xl">Thank You</h1>
        <p className="text-2xl mt-5">Your {text} is completed successfully. You can check your booking in your profile</p>
        <div className="flex my-10">
            <Link href="/">
                <button className="mx-5 bg-green px-5 py-2 font-bold hover:bg-greenHover">Back to Home Page</button>
            </Link>
            <Link href="/">
                <button className="mx-5  bg-green px-5 py-2 font-bold hover:bg-greenHover">Go to Profile</button>
            </Link>
        </div>
    </div>
      }
      </>
  )
}

export default PaymentSuccessfull