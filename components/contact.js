import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from 'axios';
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';

const Contact = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const [ inputs, setInputs ] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [ isInputs, setIsInputs ] = useState(true)

    const handleChange = (e) => {
        const {name,value} = e.target
        setInputs((input) => ({
            ...input, [name]:value
        }))
    }

    const handleEmail = async () => {
        if(inputs.name && inputs.email && inputs.subject && inputs.message !== ""){
            setIsInputs(true)
            const data = {
                reqType: "Contact Email",
                inputs: inputs
            }
            const res = await axios.post(`${process.env.url}/email`, data)
            if(res.data == "Email Sent"){
                toast.success("Email Sent Successfully")
            }
            else{
                toast.error("Failed to Send Email")
            }
        }else{
            setIsInputs(false)
        }
    }
    console.log(inputs)

  return (
    <div className="pb-20 flex font-main items-center justify-center bg-servicesBG " id='contact'>
        <div className='w-full sm:w-width flex flex-col sm:flex-row'>
            <div className="flex-1 flex flex-col sm:ml-40 mx-10 sm:mx-0">
                <div className='flex flex-col'>
                    <div ref={header}>
                        <motion.div
                        initial={{opacity: 0, scale: 0}}
                        animate={isHeader && {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                        className=" flex flex-col items-start mt-20"
                        >
                            <h1 className="text-4xl font-bold">Address</h1>
                            <div className="w-40 mt-2 flex items-center justify-start">
                                <div className='mr-3'>
                                    <div className="h-2 w-2 rounded-full bg-pink"></div>
                                </div>  
                                <div className="border-b-2 w-40 border-green"></div>
                            </div>
                        </motion.div>
                    </div>

                    <label className='text-lg mt-12'>113-115 Smedley Road Manchester M8 0RS</label>
                    <div className='mt-10'>
                        <PhoneIcon className='text-green scale-125'/>
                        <label className='ml-4 text-xl'>+ 44 7532 707561</label>
                    </div>
                    <div className='mt-4'>
                        <PhoneIcon className='text-green scale-125'/>
                        <label className='ml-4 text-xl'>+44 7449 347301</label>
                    </div>
                    <div className='mt-4'>
                        <MailIcon className='text-green scale-125'/>
                        <label className='ml-4 text-xl'>team@friendsacademy.co.uk</label>
                    </div>
                    <div className='mt-4 flex items-center'>
                        <LocationOnIcon className='text-green scale-125'/>
                        <div className='ml-4'>
                            <label className='text-xl'>113-115 Smedley Road Manchester M8 0RS</label> 
                        </div>
                    </div>

                    <div className='mt-10 flex '>
                        <a href='https://wa.me/447449347301?text=I want to inquire about Plab 2' target="_blank" rel="noreferrer" className='h-14 w-14 border border-lightGray rounded-full flex items-center justify-center sm:ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <WhatsAppIcon className=''/>
                        </a>
                        <a href='https://www.facebook.com/friendsacademymanchester' target="_blank" rel="noreferrer" className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center ml-2 sm:ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <FacebookIcon className=''/>
                        </a>
                        <div className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center  ml-2 sm:ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <YouTubeIcon className=''/>
                        </div>
                        <div className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center  ml-2 sm:ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <TwitterIcon className=''/>
                        </div>
                        <div className='h-14 w-14 border border-lightGray rounded-full flex items-center justify-center  ml-2 sm:ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <InstagramIcon className=''/>
                        </div>
                    </div>
                </div>     
            </div>

            <div className="flex-1 flex flex-col sm:mr-40 mx-10 sm:mx-0">
                <div ref={header}>
                    <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={isHeader && {opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className=" flex flex-col items-start mt-20"
                    >
                        <h1 className="text-4xl font-bold">Send a Query</h1>
                        <div className="w-40 mt-2 flex items-center justify-start">
                            <div className='mr-3'>
                                <div className="h-2 w-2 rounded-full bg-pink"></div>
                            </div>  
                            <div className="border-b-2 w-40 border-green"></div>
                        </div>
                    </motion.div>
                </div>

                <div>
                    <p className='text-lg mt-10 sm:mt-12'>If you have any questions or just want to get in touch, use the form below. We look forward to hearing from you! You can get in touch with us directly at <a className='text-green underline'>team@friendsacademy.co.uk.</a></p>
                    <input className='p-2 w-full border border-green rounded-sm mt-5 text-lg outline-black' name='name' value={inputs.name} placeholder='Name' onChange={handleChange}/>
                    <input className='p-2 w-full border border-green rounded-sm mt-5 text-lg outline-black' name='email' value={inputs.email} placeholder='Email' onChange={handleChange}/>
                    <input className='p-2 w-full border border-green rounded-sm mt-5 text-lg outline-black' name='subject' value={inputs.subject} placeholder='Subject' onChange={handleChange}/>
                    <textarea className='p-2 pb-20 w-full border border-green rounded-sm mt-5 text-lg outline-black' name='message' value={inputs.message} placeholder='Message' onChange={handleChange}/>
                    { isInputs === false ? <Alert severity="error" className="mt-2 w-full">Please fill the required fields!</Alert> : null }
                    <button className='w-full bg-pink mt-5 p-4 rounded-md text-white font-bold hover:bg-green duration-300' onClick={handleEmail}>Send Message</button>
                </div>
            </div>
        </div>
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

export default Contact