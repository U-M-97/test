import Head from 'next/head'
import Image from 'next/image'
import Slider from '../components/slider'
import PlabInfo from '../components/plabInfo'
import Services from '../components/services'
import About from '../components/about'
import Contact from '../components/contact'
import Events from '../components/events'
import Accommodation from '../components/accomodation'
import Testimonials from '../components/testimonials'
import TrustedBy from '../components/trustedBy'
import Intro from '../components/intro'
import { getCookie } from "cookies-next"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { loginSuccess, logout, userReviews } from "../redux/userReducer"
import { addCourse } from "../redux/courseReducer"
import { addCoupon, delCoupon } from '../redux/couponReducer'

export default function Home(props) {

  const dispatch = useDispatch()
  console.log(props.coupons)
  dispatch(addCourse(props.courses))
  dispatch(userReviews(props.reviews))
  if(props.coupons === undefined || props.coupons.length === 0){
    dispatch(delCoupon())
  }else{
    dispatch(addCoupon(props.coupons))
  }
  if(props.user === "Token is not Valid" || props.user === "User not exists"){
    dispatch(logout())
  }
  else{
    dispatch(loginSuccess(props.user))
  }

  return (
    <div className=''>
      <Head>
        <title>Friends Academy UK</title>
        <link rel="icon" href="/images/Friends Academy.png"/>
      </Head>
      <Slider/>
      <Intro/>
      <PlabInfo/>
      <Services/>
      <About/>
      <Testimonials/>
      <TrustedBy/>
      <Events/>
      <Accommodation/>
      <Contact/>
    </div>
  )
}

export async function getServerSideProps({req, res}) {

  const cookieExist = await getCookie("token", {req, res});
  // console.log(cookieExist)
  
  const userData  = await axios.post(`${process.env.url}/userData`, {cookieExist})
  const coursesData = await axios.get(`${process.env.url}/courses`)
  const getReviews = await axios.get(`${process.env.url}/reviews`)
  const getCoupons = await axios.get(`${process.env.url}/clientCoupon`)
  const reviews = getReviews.data
  const user = userData.data
  const courses = coursesData.data
  const coupons = getCoupons.data

  return { props: { user, courses, reviews, coupons} }
}
