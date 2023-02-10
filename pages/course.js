import Image from "next/image"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from "react"
import { useSelector } from "react-redux"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import dayjs from "dayjs"
import { useEffect } from "react";
import axios from "axios";

const Course = () => {

    const course = useSelector((state) => state.course.selectedCourse)
    const [ readMore, setReadMore ] = useState(false)
    const text = "Cancellation Policy: - To confirm your booking, you must pay online / bank transfer / money transfer - The course fee can not be transferred to any other candidate - A deduction of £125 will be charged for any cancellation of booking of your PLAB 2 course until a week before the course start date - No cancellation request will be accepted after the start date of your PLAB 2 course however you will be allowed to reschedule your course - Any agreed refund will be refunded back to you within one month of cancellation date to the same card / account the payment was made from - No fee will be refunded for any cancellation within last 7 days prior to starting the course - MOCK fee is non-refundable and non-transferable - High Yield course fee is non-refundable and non-transferable - You can not sale accommodation to any other candidate / person - It is your responsibility to keep your room tidy and return in an acceptable condition - No smoking and / or alcohol consumption will be allowed in the academy as well as within the accommodation - In case of unforeseen situation or special circumstances e.g Natural Pandemic / National Emergency / PLAB 2 exam cancellation we will offer alternate dates of your booked courses without any extra charges however if you want to cancel then a cancellation charges will be applicable as mentioned above. "
    const user = useSelector((state) => state.user.currentUser)
    const [ courseRegistered, setCourseRegistered ] = useState(false)
    const router = useRouter()
    const [ totalCourseDays, setTotalCourseDays ] = useState()
    const [ schedule, setSchedule ] = useState()
    const [ bookingType, setBookingType ] = useState()

    const handleSchedule = () => {
        let arr = []
        let startDate = dayjs(course.startDate)
    
        for(let i = 0; i<=totalCourseDays; i++){
            arr.push({
                day: startDate.format("dddd"), date: startDate.format("DD MMMM, YYYY")
            })
           startDate = startDate.add(1, "day")
        }
        setSchedule(arr)
    }

    useEffect(() => {
        if(course){
            setTotalCourseDays(dayjs(course.endDate).diff(course.startDate, "day"))
            if(course.category === "Mini Mocks" || course.category === "Personalised Sessions"){
                setBookingType("Request")
            }else{
                setBookingType("Book")
            }
        }
    } ,[course])

    useEffect(() => {
        handleSchedule()
    }, [totalCourseDays])

    const handleCourseCheck = () => {
        if(!user){
            router.push("/account/login")
        }else{
            const findCourse = user.courses.find((item) => {
                if(item._id === course._id){
                    return true
                }
            })
            
            if(findCourse){
                setCourseRegistered(true)
                toast("Course already Registered")
            }else{
                router.push("/booking")
            }
        }   
    }

    const handleCourseRequest = async () => {
        if(!user){
            router.push("/account/login")
        }else{
            try{
                const data = {
                    reqType: "Course Request",
                    email: user.email,
                    course: course.title
                }
                const res = await axios.post(`${process.env.url}/email`, data)
            }catch(err){
                console.log(err)
            }
        }   
    }

    console.log(course)

  return (
    <div className="flex flex-col items-center font-main mb-10">
        <div className="sm:flex">
            <div className="hidden sm:inline sm:w-testimonials p-10">
                <Image src={course.image} height="500px" width="500px" objectFit="cover"/>
            </div>
            <div className="sm:hidden p-5 flex items-center justify-center">
                <Image src={course.image} height="300px" width="300px" objectFit="cover"/>
            </div>
            <div className="sm:w-courseWidth p-5 sm:p-10 ">
                <h1 className="text-4xl font-bold">{course.title}</h1>
                <p className="text-2xl mt-5">{course.tagline}</p>
              { isNaN(totalCourseDays) == false && <div className="mt-5 flex text-2xl">
                    <p className="font-bold">Duration :</p>
                    <p className="ml-2">{totalCourseDays + 1} Days</p>
                </div>}
                { course.startDate && <div className="flex text-2xl items-center mt-5 ">
                    <p className="font-bold">Starts on: </p>
                    <p className="ml-3">{dayjs(course.startDate).format("DD MMMM, YYYY")}</p>
                </div>}
                <div className="mt-5 flex text-2xl">
                    <p className="font-bold">Price :</p>
                    <p className="ml-2">£{course.price}</p>
                </div>  
                <pre className="mt-5 font-main text-xl whitespace-pre-wrap leading-10">{course.description}</pre>
                {/* <ul className="mt-10 list-disc text-xl ml-4">
                    <li>PLAB 2 full course - ONLINE & ONSITE 12 to 14 days full course</li>
                    <li className="mt-3">Detailed discussion and interactive sessions by our experienced team</li>
                    <li className="mt-3">Ongoing practice sessions everyday</li>
                    <li className="mt-3">One full day dedicated for SIMMAN and Acutely unwell patient management</li>
                    <li className="mt-3">Full day reserved for mannequin discussions and practice</li>
                    <li className="mt-3">Four MOCKS (One full mock consisting of 16 stations, 3 mini mocks consisting of 8 stations each)</li>
                    <li className="mt-3">Pay once and attend course till you pass</li>
                    <li className="mt-3">Recorded lectures (free one play time)</li>
                    <li className="mt-3">RETAKE INTERNAL CANDIDATES (Ex Friends Academy Candidates) - FREE</li>
                </ul> */}
            </div>
            <div className="mt-10">
                { bookingType === "Book" ? <button className="hidden sm:inline bg-green p-3 hover:bg-greenHover duration-300 rounded-md font-bold" onClick={handleCourseCheck}>Book Now</button> 
                : bookingType === "Request" ? <button className="bg-green p-3 hover:bg-greenHover duration-300 rounded-md font-bold" onClick={handleCourseRequest}>Request to Book</button> : null
            }
                {courseRegistered == true ? 
                    <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    />
                     : null  
                }
            </div>
        </div>
        <div className="sm:p-20 flex flex-col items-center">
            <h1 className="text-4xl font-bold">Instructors</h1>
            <div className="sm:flex mt-10">
                <div className="flex flex-col sm:mx-5">
                    <div className="flex items-center mx-10 mb-10">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-green">
                            <Image src="/images/Rehman.jpeg" layout="fill" objectFit="cover"/>
                        </div>
                        <p className="text-xl font-bold ml-5">Dr Rehman Bashir</p>
                    </div>
                </div>
                <div className="flex flex-col sm:mx-5">
                    <div className="flex items-center mx-10 mb-10">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-green">
                            <Image src="/images/Sohail Tariq2.jpeg" layout="fill" objectFit="cover"/>
                        </div>
                        <p className="text-xl font-bold ml-5">Dr Sohail Tariq</p>
                    </div>
                </div>
            </div>      
        </div>
        
        <div className="sm:w-aboutWidth flex flex-col items-center justify-center mb-10 mt-5 sm:mt-0">
            { course.startDate && <h1 className="text-4xl font-bold">Schedule</h1> }
            { course.startDate && <div className="sm:w-courseWidth mt-5">
                <div className="flex flex-col sm:flex-row items-center justify-center mt-5">
                    {course.endDate && <p className="text-xl font-bold ">Dates :</p>}
                    {!course.endDate && <p className="text-xl font-bold ">Date :</p>}
                    {course.endDate && <p className="text-xl ml-2">{dayjs(course.startDate).format("DD MMMM, YYYY")} - {dayjs(course.endDate).format("DD MMMM, YYYY")}</p>}
                    {!course.endDate && <p className="text-xl ml-2">{dayjs(course.startDate).format("DD MMMM, YYYY")}</p>}
                </div>
            </div>}
            {
                schedule && schedule.map((item) => {
                    return(
                        <div className="flex mt-10 w-full sm:w-courseWidth items-center justify-between sm:text-xl border-b border-green pb-5" key={item}>
                            <div>
                                <p>{item.day}</p>
                                <p>{item.date}</p>
                            </div>
                            <p>10:00 am - 6:00 pm</p>
                        </div>
                    )       
                })
            }
            <p className="text-xl text-gray mt-10">London time (GMT +01:00)</p>
        </div>
        <div className="mt-5 flex flex-col justify-center items-center sm:w-courseWidth ">
            <h1 className="text-4xl font-bold mx-5">Location and Contact Details</h1>
            <div className="sm:w-courseWidth mx-5">
                <div className="flex mt-10">
                    <PhoneIcon className="text-green scale-150"/>
                    <p className="text-xl ml-5">+ 44 7532 707561</p> 
                </div>
                <div className="flex mt-5">
                    <PhoneIcon className="text-green scale-150"/>
                    <p className="text-xl ml-5">+ 44 7449 347301</p> 
                </div>
                <div className="flex mt-5">
                    <MailIcon className="text-green scale-150"/>
                    <p className="text-xl ml-5">team@friendsacademy.co.uk</p>
                </div>
                <div className="flex mt-5">
                    <LocationOnIcon className="text-green scale-150"/>
                    <p className="text-xl ml-5">113 Smedley Road, Cheetham Hill, Manchester, UK</p>
                </div>
            </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-center sm:w-courseWidth p-5 sm:p-0">
            <h1 className="text-4xl font-bold">Booking Policy</h1>
            <p className="text-xl mt-5">Bookings will open 420 days before the session starts.</p>
            <p className=" text-base text-justify  mt-5">{readMore == false ? text.slice(0,300) : text}<span className="hover:text-green cursor-pointer font-bold" onClick={() => setReadMore(!readMore)}>{readMore == false ? "...Read More" : "Read Less"}</span> </p>
        </div>
        { bookingType === "Book" ?  <button className="bg-green py-3 px-5 rounded-md font-bold mt-10 hover:bg-greenHover duration-300" onClick={handleCourseCheck}>Book Now</button>
        : bookingType === "Request" ? <button className="bg-green py-3 px-5 rounded-md font-bold mt-10 hover:bg-greenHover duration-300" onClick={handleCourseRequest}>Request to Book</button> : null    
    }
    </div>
  )
}

export default Course