import Header from "./header"
import Navbar from "./navbar"
import Footer from "./footer"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import DiscountHeader from '../components/discountHeader'
import { useSelector } from "react-redux"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { motion } from 'framer-motion';
import { Link as Scroll } from "react-scroll"

export default function Layout({children}){

    const router = useRouter()
    const [ loading, setLoading ] = useState(false)
  
    useEffect(() => {
  
      const handleStart = (url) => {
        if(url !== router.asPath){
          setLoading(true)
        }
      }
  
      const handleComplete = (url) => {
        if(url === router.asPath){
          setLoading(false)
          setTimeout(() =>{setLoading(false)},5000)
        }
      }
  
      router.events.on("routeChangeStart", handleStart)
      router.events.on("routeChangeComplete", handleComplete)
      router.events.on("routeChangeError", handleComplete)
      console.log(loading)
  
      return () => {
        router.events.off("routeChangeStart", handleStart)
        router.events.off("routeChangeComplete", handleComplete)
        router.events.off("routeChangeError", handleComplete)
      }
    })

  const [ mobile, setMobile ] = useState(false)
  const homePage = router.pathname == "/account/signup" || router.pathname == "/account/login" || router.pathname.startsWith("/admin") ? false : true
  const home = router.pathname === "/" ? true : false
  
  useEffect(() => {
    console.log(mobile)
  }, [mobile])

  const [ discountHeader, setDiscountHeader ] = useState(true)
  const coupon = useSelector((state) => state.coupon.coupons)

  const [ scrolled, setScrolled ] = useState(false)

  useEffect(() => {

    window.addEventListener("scroll", () => {
      if(window.scrollY > 400){
        setScrolled(true)
      }else{
        setScrolled(false)
      }
    })

  }, [])

  return (
    <>
      {
      loading === true ? 
      <div className="h-screen flex items-center justify-center">
        <CircularProgress/>
      </div>
      :
      <div className={mobile == true ? "overflow-y-hidden" : ""}>
          {
            homePage && 
            <>
               <motion.div
                initial={{y: 140}}
                animate={{y: scrolled === true ? 0 : 140}}
                transition={{duration: 1}}
                className="fixed z-50 bottom-20 right-20 rounded-full cursor-pointer "
                >
                  <Scroll 
                  to="header"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={2000}
                  className="bg-greenTransparent p-4 rounded-full hover:scale-125 flex items-center justify-center duration-300"
                  >
                    <ArrowUpwardIcon className=" scale-testimonialArrow"/>
                  </Scroll>
                </motion.div> 
              <Header/>
              {/* { home && coupon != null && discountHeader === true ? <DiscountHeader close={() => setDiscountHeader(false)}/> : null} */}
              <Navbar on={() => setMobile(true)} off={() => setMobile(false)}/>
            </> 
          }
          <main>
            {children}
          </main>
          {
            homePage && <Footer/>
          }    
      </div>
      }
    </>
  )
}
