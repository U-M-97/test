import Link from "next/link"

const PaymentUnsuccessfull = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 font-main">
        <h1 className="text-6xl text-red-600">Sorry</h1>
        <p className="text-2xl mt-5">Your payment is failed. Please try again or contact us</p>
        <div className="flex my-10">
            <Link href="/">
                <button className="mx-5 bg-green px-5 py-2 font-bold hover:bg-greenHover">Back to Home Page</button>
            </Link>
            <Link href="/">
                <button className="mx-5  bg-green px-5 py-2 font-bold hover:bg-greenHover">Go to Profile</button>
            </Link>
        </div>
        
    </div>
  )
}

export default PaymentUnsuccessfull