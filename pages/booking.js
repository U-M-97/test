import Image from "next/image"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useRouter } from "next/router"
import axios from "axios"
import { loadStripe } from '@stripe/stripe-js'
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const Booking = () => {

    const stripePromise = loadStripe(process.env.stripe_public_key)
    const course = useSelector((state) => state.course.selectedCourse)
    const [ selectedCourse, setSelectedCourse ] = useState()
    const [phone, setPhone] = useState()
    const user = useSelector((state) => state.user.currentUser)
    const router = useRouter()
    user == null ? router.push("/account/login") : null
    const [ valueCalendar, setValueCalendar ] = useState(new Date())
    const [ calendar, setCalendar ] = useState(false)
    const [ plab2, setPlab2 ] = useState(null)
    const [ prevAttempt, setPreviousAttempt ] = useState()
    const [ emptyInputs , setEmptyInputs ] = useState(false)
    const [ dialog, setDialog ] = useState(false)
    const [ couponCode, setCouponCode ] = useState()
    const [ isCoupon, setIsCoupon ] = useState(false)
    const coupons = useSelector((state) => state.coupon.coupons)
    const [ discountOn, setDiscountOn ] = useState()
    const [ apiRes, setApiRes ] = useState(false)
    const [ invalidCoupon, setInvalidCoupon ] = useState(false)
    const [ coupon, setCoupon ] = useState("No Coupon")

    useEffect(() => {
        setSelectedCourse(course)
    }, [course])
    
    const formatDate = () => {
        const day = valueCalendar.getDate()
        const month = valueCalendar.getMonth() + 1
        const year = valueCalendar.getFullYear()
        const result = `${day}/${month}/${year}`
        setPlab2(result)
    }

    useEffect(() => {
        setCalendar(false)
        if(calendar == true){
            formatDate()
        }
    }, [valueCalendar])

    useEffect(() => {
        
        const handleKey = (e) => {
            const link = document.getElementById("calendar")
            link && link.contains(e.target) ? null : setCalendar(false)
        }
        document.addEventListener("mousedown" , handleKey)
        
        return () => {
            document.removeEventListener("mousedown", handleKey)
    }
    }, [calendar])

    const handlePay = async () => {

        if(phone == null && prevAttempt == null){
            setEmptyInputs(true)
        }else{
            setEmptyInputs(false)
            const stripe = await stripePromise
            if(user.plab2Date !== undefined){
                if(prevAttempt != null && phone != null){
                    console.log("Running")
                    axios.put(`${process.env.url}/userData`, {user, prevAttempt, phone})
                }
            }
            else{
                if(plab2 != null && prevAttempt != null && phone != null){
                    console.log("Running2")
                    axios.put(`${process.env.url}/userData`, {user, plab2, prevAttempt, phone})  
                }
            }
            const res = await axios.post(`${process.env.url}/checkout_sessions`, {user, selectedCourse, coupon, paymentType: "Course Payment"}) 
            console.log(res.data.id)
          
            const result = await stripe.redirectToCheckout({
                sessionId: res.data.id
            })
        }
    }

    const findCoupons = () => {
        selectedCourse && coupons && coupons.find((coupon) => {
            if(coupon.discountOn === "All Courses"){
                setIsCoupon(true)
                setDiscountOn(coupon.discountOn)
            }else if(coupon.discountOn === selectedCourse.title){
                setIsCoupon(true)
                setDiscountOn(coupon.discountOn)
            }
        })
    }

    useEffect(() => {
        findCoupons()
    }, [selectedCourse && selectedCourse.title])

    const handleClose = () => {
        setDialog(false)
    }
    
    const handleOpen = () => {
        setDialog(true)
    }

    const handleCoupon = async () => {
        setApiRes(true)
        const data = {
            course: discountOn,
            code: couponCode
        }
        const checkCoupon = await axios.post(`${process.env.url}/clientCoupon`, data)
        if(checkCoupon.data.message === "Coupon is Valid"){
            handleClose()
            toast.success("Coupon Added Successfully")
            setIsCoupon(false)
            setApiRes(false)
            const discountedPrice = selectedCourse.price - checkCoupon.data.discount
            selectedCourse && setSelectedCourse((item) => ({
                ...item, price: discountedPrice
            }))
            setCoupon(checkCoupon.data.id)
        }else{
            setApiRes(false)
            setInvalidCoupon(true)
        }
    }

    console.log(selectedCourse)

  return (
    <div className="flex items-center justify-center my-10 font-main">
        <div className="sm:h-slider sm:w-aboutWidth flex sm:shadow-2xl shadow-gray">
            <div className="hidden sm:flex relative w-1/3">
                <Image src="/images/bg-main-desktop.png" layout="fill" objectFit="fill"/>
                <div className="absolute left-14 top-10 h-56 w-96">
                    <Image src="/images/bg-card-front.png" layout="fill"/>
                    <div className=" flex left-2 font-semibold tracking-debitCard absolute top-28 text-xl text-white">
                        <p className="ml-5 ">0000</p>
                        <p className="ml-5">0000</p>
                        <p className="ml-5">0000</p>
                        <p className="ml-5">0000</p>
                    </div>
                    <p className="tracking-name absolute text-white font-bold bottom-5 left-7">TOM CRUISE</p>
                    <p className="tracking-name absolute text-white font-bold bottom-5 right-7">00/00</p>
                </div>
                <div className="absolute top-72 left-14 h-56 w-96">
                    <Image src="/images/bg-card-back.png" layout="fill"/>
                </div>
            </div>
            <div className=" sm:w-4/6">
                <div className="flex items-center justify-center">
                    <h1 className="sm:ml-32 sm:mt-10 text-xl font-bold px-5">Welcome to Friends Academy Booking Area</h1>
                </div>
                <div className=" relative p-5 sm:p-0 sm:ml-28 mt-5 sm:mt-10 flex flex-col">
                    <h1 className="text-lg ">Tell us a bit about yourself</h1>
                    <PhoneInput
                    country={'pk'}
                    value={phone}
                    onChange={setPhone}
                    className="mt-10"
                    />
                    <input type="number" min="0" placeholder="Previous Plab 2 Attempts" className=" sm:w-96 mt-10 border border-black py-4 px-3 rounded-md" value={prevAttempt} onChange={(e) => setPreviousAttempt(e.target.value)}/>
                    {user && !user.plab2Date ? <input placeholder="Your Plab 2 Exam Date" className=" sm:w-96 mt-10 border border-black py-4 px-3 rounded-md" value={plab2} onClick={() => setCalendar(true)}/> : null}
                    {calendar && <div className="z-10 absolute bottom-40" id="calendar"> 
                    <Calendar  className=" bg-white border-2" onChange={setValueCalendar} value={valueCalendar}/>
                    </div> }
                    {emptyInputs == true ? <Alert severity="error" className="mt-2 sm:w-96">Please fill the required fields!</Alert> : null }
                    <div className="mt-10 flex sm:inline items-center justify-center">
                        <button className="text-xl font-bold py-3 bg-green hover:bg-greenHover rounded-md w-2/4 mb-10 sm:mb-0" onClick={handlePay}>PAY £{selectedCourse && selectedCourse.price}</button>
                        { isCoupon === true ? <button className="text-xl font-bold py-3 border rounded-md ml-5 sm:w-72 hover:bg-pink" onClick={handleOpen}>USE COUPON</button> : null }
                    </div>
                </div>
            </div>
        </div>

        <Dialog open={dialog} onClose={handleClose} scroll="paper" maxWidth="false">
            { apiRes === false ? <div className="w-aboutPic h-52 my-5 flex flex-col items-center justify-center font-main">
                <h1 className="text-2xl font-bold">Enter Coupon Code</h1>
                <input type="text" className="w-96 font-bold px-5 py-3 rounded-lg mt-5 border focus:outline-green" onChange={(e) => setCouponCode(e.target.value)}/>
                {invalidCoupon === true ? <Alert  sx={{ fontSize: '15px', fontWeight: "medium"}} variant="filled" severity="error" className="mt-2 w-96">Coupon is Invalid</Alert> : null }
                <button className="mt-5 bg-green rounded-md px-10 py-1 font-bold text-xl cursor-pointer hover:bg-greenHover" onClick={handleCoupon}>USE</button>
            </div> :
            <div className="w-aboutPic h-52 my-5 flex items-center justify-center">
                <CircularProgress/>
            </div> }
        </Dialog>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
  )
}

export default Booking