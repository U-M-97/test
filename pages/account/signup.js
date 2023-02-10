import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import GoogleIcon from '@mui/icons-material/Google';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userReducer"
import { useRouter } from 'next/router'

const Signup = () => {
    
    const dispatch = useDispatch()
    const router = useRouter()
    const [ calendar, setCalendar ] = useState(false)
    const [ value, setValue ] = useState(new Date())
    const [ inputs, setInputs ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [ plab2, setPlab2 ] = useState(null)
    const [ emailFormat , setEmailFormat ] = useState(true)
    const [ isInputs, setIsInputs ] = useState(true)
    const [ userExist,  setUserExist ] = useState(false)

    const formatDate = () => {
        const day = value.getDate()
        const month = value.getMonth() + 1
        const year = value.getFullYear()
        const result = `${day}/${month}/${year}`
        setPlab2(result)
    }

    const handleClick = (e) => {
        const {name, value} = e.target
        setInputs((prev) => ({
            ...prev, [name]:value
        }))
    }
    console.log(inputs)

    const emailFormatCheck = (email) => {
        return /\S+@\S+\.\S+/.test(email);
      }

    const handleSubmit = async () => {
        setUserExist(false)
        if(emailFormatCheck(inputs.email || inputs.firstName != "" || inputs.lastName != "" || inputs.email != "" || inputs.password != "" || plab2 != null)){
            setEmailFormat(true)
            setIsInputs(true)
            const data = {
                inputs, plab2, reqMethod: "Sign Up"
            }
            try{
                const res = await axios.post(`${process.env.url}/email/authEmail`, data)
                console.log(res.data)
                if(res.data == "Email already exists"){
                    setUserExist(true)
                }else{
                    // dispatch(loginSuccess(res.data))
                    router.push("/")
                }
            }catch(err){
                console.log(err)
            }
            }
            else{
                setEmailFormat(false)
                setIsInputs(false)
            }
    }

    useEffect(() => {
        setCalendar(false)
        if(calendar == true){
            formatDate()
        }
    }, [value])

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

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-lightGray font-main">
        <div className="flex h-signup w-aboutWidth shadow-lg shadow-gray rounded-2xl">
            <div className="relative h-full w-full flex-1 overflow-hidden rounded-l-2xl">
                <Image src="/images/loginpage.jpg" layout="fill" objectFit="cover" />
            </div>
            <div className="relative flex-1 flex flex-col items-center bg-login justify-center rounded-r-2xl">
                <h1 className="font-bold text-2xl mt-12">Welcome to Friends Academy UK</h1>
                <input placeholder="First Name" name="firstName" value={inputs.firstName} className="p-3 w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-5" onChange={handleClick}/>
                <input placeholder="Last Name" name="lastName" value={inputs.lastName} className="p-3 w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-2" onChange={handleClick}/>
                <input placeholder="Email" name="email" value={inputs.email} className="p-3 w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-2" onChange={handleClick}/>
                {emailFormat == false ? <p className="text-red-600 font-bold">Email format is invalid</p> : null }
                <input placeholder="Password" name="password" value={inputs.password} type="password" className="p-3 w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-2" onChange={handleClick}/>
                {calendar && <div className="z-10 absolute top-50 left-50 " id="calendar"> 
                    <Calendar  className=" bg-white border-2" onChange={setValue} value={value}/>
                </div> }
                <div className="flex items-center w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-2 bg-white cursor-text" onClick={() => setCalendar(true)}>
                    <input placeholder="Your PLAB2 Date" className="p-3 outline:none h-full w-full focus:outline-none " value={plab2}/>
                    <CalendarMonthIcon className=" cursor-text mr-5"/>
                </div>  
                { isInputs == false ? <p className="text-red-600 font-bold">Please fill the required fields</p> : null}
                { userExist == true ? <p className="text-red-600 font-bold">User already exists</p> : null }
                <button className="bg-green hover:bg-greenHover text-xl p-3 rounded-sm w-96 mt-2" onClick={handleSubmit}>Sign Up</button>
                <label className="mt-1">OR</label>
                <Link href="/api/google/authGoogle">
                    <a className="bg-white hover:bg-googleHover p-1 rounded-sm w-96 mt-1 items-center flex cursor-pointer">
                        <div className="relative h-10 w-10 ml-20">
                            <Image src="/images/google.png" layout="fill" objectFit="cover"/>
                        </div>
                        <p className="ml-3 text-gray">Sign in with Google</p>
                    </a>
                </Link>
                
                <Link href="/api/facebook/authFacebook">
                    <a className="bg-facebookColor p-1 rounded-sm w-96 mt-2 flex items-center hover:bg-facebookHover">
                        <div className="relative h-11 w-11 ml-20">
                            <Image src="/images/facebook.png" layout="fill" objectFit="cover"/>
                        </div>
                        <p className="ml-2 text-white">Sign in with Facebook</p>
                    </a>
                </Link>
                
                <div className="flex mt-5 mb-10">
                     <h1 className="">Already have an account?</h1>
                     <a className="ml-2 underline hover:text-green">
                        <Link href="/account/login">Login</Link>
                     </a>
                </div>
              
            </div> 
        </div>
    </div>
  )
}

export default Signup