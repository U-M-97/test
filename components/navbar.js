import Image from "next/image"
import style from "../styles/navbar.module.css"
import Link from "next/link"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch , useSelector } from 'react-redux'
import { logout } from "../redux/userReducer"
import { deleteCookie } from "cookies-next"
import { useRouter } from 'next/router'
import { Link as Scroll } from "react-scroll"

const Navbar = (props) => {

    const [ mouseEnter , setMouseEnter ] = useState(false)
    const [ isClicked, setIsClicked ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const user = useSelector((state) => state.user.currentUser)
    const [ isClickedProfile, setIsClickedProfile] = useState(false)  
    const [ mouseEnterProfile, setMouseEnterProfile ] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [ scrolled, setScrolled ] = useState(false)

    useEffect(() => {
        console.log("running")
        const handleKey = (e) => {
            const link = document.getElementById("moreInformation")
            const dropDown = document.getElementById("dropDown")
            const insideLink = link.contains(e.target)
            let insideDropDown
            if(dropDown){
                insideDropDown = dropDown.contains(e.target)
            }
            if(!insideLink && !insideDropDown){
                setIsClicked(false)
            }

            const profileAvatar = document.getElementById("profileAvatar")
            const dropDownProfile = document.getElementById("profileMenu")
            let insideProfileAvatar
            if(profileAvatar){
                insideProfileAvatar = profileAvatar.contains(e.target)
            }
            let insideDropDownProfile
            if(dropDownProfile){
                insideDropDownProfile = dropDownProfile.contains(e.target)
            }
            if(!insideProfileAvatar && !insideDropDownProfile){
                setIsClickedProfile(false)
            }
        }

        document.addEventListener("mousedown" , handleKey)
        
        return () => {
            document.removeEventListener("mousedown", handleKey)
    }
    }, [])

    const handleDropDown = () => {
        setMouseEnter(false)
        setIsClicked(!isClicked)
    }

    const handleClick = () => {
        setOpen(!open)
        open == false ? props.on() : props.off()
    }

    const logoutUser = () => {
        dispatch(logout())
        deleteCookie("token")
        window.location.href="/"
    }

    useEffect(() => {

        window.addEventListener("scroll", () => {

            if(window.scrollY > 100){
                setScrolled(true)
            }else{
                setScrolled(false)
            }
        })

    }, [])

  return (
    <div className={`sticky top-0 z-50 ${scrolled === true ? "bg-green duration-500" : "bg-transparent duration-500"}`}>
        <div className={style.border}></div>
        
        <div className=" flex items-center justify-between px-6 mt-3 sm:hidden">
            <div className=" flex items-center justify-center">
                <Image src="/images/Friends Academy.png" alt="logo" height={"110px"} width={"300px"} objectFit="cover"/>
            </div>
            <div className="" onClick={handleClick}>
                <MenuIcon className="scale-150"/>
            </div>
        </div>
        
        <div className={`font-main fixed top-0 flex flex-col h-full w-screen bg-white duration-700 z-50 sm:hidden ${open == false ? " -translate-x-full" : " translate-x"}`}>
            <div className="flex justify-end mt-5">
                <div className="bg-green p-2 h-10 w-10 mr-5 rounded-md" onClick={handleClick}>
                    <CloseIcon className="scale-125"/>
                </div>
            </div>
            <ul className="mt-10">
                <li className="font-bold text-2xl border-b border-b-lightGray">
                    <a href="/">
                        <p className="p-4">HOME</p>
                    </a>
                </li>
                <li className="font-bold text-2xl border-b border-b-lightGray">
                    <Scroll className="cursor-pointer bg-pink" onClick={handleClick}
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <p className="p-4">ABOUT</p>
                    </Scroll>
                </li>
                <li className="font-bold text-2xl border-b border-b-lightGray">
                    <Scroll className="cursor-pointer" onClick={handleClick}
                    to="bookOnline"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <p className="p-4">COURSES</p>
                    </Scroll>
                </li>
                <li className="font-bold text-2xl border-b border-b-lightGray">
                    <Scroll className="cursor-pointer" onClick={handleClick}
                    to="accomodation"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <p className="p-4">ACCOMODATION</p>
                    </Scroll>
                </li>
                <li className="font-bold text-2xl border-b border-b-lightGray">
                    <Scroll className="cursor-pointer" onClick={handleClick}
                    to="reviews"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <p className="p-4">CANDIDATE REVIEWS</p>
                    </Scroll>
                </li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">BLOG</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">GALLERY</li>
                <li className="font-bold text-2xl border-b border-b-lightGray">
                    <Scroll className="cursor-pointer" onClick={handleClick}
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <p className="p-4">CONTACT</p>
                    </Scroll>
                </li>
            </ul>
        </div>
       
        <div className="hidden py-1 sm:flex font-main sm:justify-center">
            <div className="flex items-center justify-center ml-10 w-72">
                <Image src="/images/Friends Academy.png" alt="logo" height={"70px"} width={"210px"} objectFit="cover"/>
            </div>
           <ul className={`flex ${user ? "ml-20" : "ml-40"} items-center`}>
                <li className={`mr-8 duration-200 ${scrolled === true ? "hover:text-white" : "hover:text-green"}`}>
                    <Link href="/">
                        <a>HOME</a>
                    </Link>
                </li>

                <li className={`mr-8 duration-200 ${scrolled === true ? "hover:text-white" : "hover:text-green"}`}>
                    <Scroll className="cursor-pointer"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <a>ABOUT</a>
                    </Scroll>
                </li>

                <li className={`mr-8 duration-200 ${scrolled === true ? "hover:text-white" : "hover:text-green"}`}>
                    <Scroll className="cursor-pointer"
                    to="bookOnline"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <a>COURSES</a>
                    </Scroll>
                </li>

                <li className={`mr-8 duration-200 ${scrolled === true ? "hover:text-white" : "hover:text-green"}`}>
                    <Scroll className="cursor-pointer"
                        to="accomodation"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={2000}
                        >
                        <a>ACCOMODATION</a>
                    </Scroll>
                </li>

                <li className={`mr-8 duration-200 ${scrolled === true ? "hover:text-white" : "hover:text-green"}`}>
                    <Scroll className="cursor-pointer"
                    to="reviews"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <a>CANDIDATE REVIEWS</a>
                    </Scroll>
                </li>

                <li className={`mr-8 duration-200 cursor-pointer ${scrolled === true ? "hover:text-white" : "hover:text-green"}`} id="moreInformation" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} onClick={handleDropDown}>
                    <a>MORE INFORMATION</a>
                    <KeyboardArrowDownIcon/>
                </li>

                <div className="relative inline-block">
                    { mouseEnter == true || isClicked == true ? <div className="right-6 absolute w-52 top-2 z-30 bg-white" id="dropDown" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
                            <div className=" border-t-4 border-green mt-4"></div>
                            <ul>
                                <li className=" p-4 border-b border-lightGray cursor-pointer duration-300 hover:bg-green hover:text-white">
                                    <Link href="">
                                        <a>BLOG</a>
                                    </Link>
                                </li>

                                <li className=" p-4 border-b border-lightGray cursor-pointer duration-300 hover:bg-green hover:text-white">
                                    <Link href="">
                                        <a>GALLERY</a>
                                    </Link>
                                </li>
                            </ul>
                        
                        </div> : null
                    }                   
                </div>
                   
                <li className={`mr-8 duration-200 ${scrolled === true ? "hover:text-white" : "hover:text-green"}`}>
                    <Scroll className="cursor-pointer"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={2000}
                    >
                        <a>CONTACT</a>
                    </Scroll>
                </li>

                

                { user == null ? null : 
                <div className='mr-4 text-gray relative' onMouseEnter={() => setMouseEnterProfile(true)} onMouseLeave={() => setMouseEnterProfile(false)}>
                    <div id="profileAvatar" className='border-2 border-black h-16 w-16 relative overflow-hidden rounded-full cursor-pointer' onClick={() => setIsClickedProfile(!isClickedProfile)}>
                        <Image src={user.image} layout={"fill"} objectFit="cover" alt="profile picture"/>
                    </div>
                    {isClickedProfile == true || mouseEnterProfile == true ? 
                     <div id="profileMenu" className="flex flex-col justify-between absolute top-16 right-0 border-t-4 border-green bg-white z-40 w-96 text-black">
                        <Link href="/profile">
                            <div className="border-b border-lightGray py-4 px-5 hover:bg-green hover:text-white duration-300 cursor-pointer">
                                <a className="text-xl">Profile</a>
                            </div>
                        </Link>

                        <Link href="/account/signup">
                            <div className="border-b border-lightGray py-4 px-5  hover:bg-green hover:text-white duration-300 cursor-pointer">
                                <a className="text-xl">Your Booking and Subscriptions</a>
                            </div>
                        </Link>

                        <Link href="/makeAPayment">
                            <div className="border-b border-lightGray py-4 px-5  hover:bg-green hover:text-white duration-300 cursor-pointer">
                                <a className="text-xl">Make a Payment</a>
                            </div>     
                        </Link>      

                        <div className="border-b border-lightGray py-4 px-5  hover:bg-green hover:text-white duration-300 cursor-pointer" onClick={logoutUser}>
                            <a className="text-xl">Logout</a>
                        </div>
                     </div>
                     : null
                    }
                   
                </div>
            }
           </ul>
        </div>
    </div>
  )
}

export default Navbar