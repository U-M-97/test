import Image from "next/image"
import CopyrightIcon from '@mui/icons-material/Copyright';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {

    const date = new Date().getFullYear()

  return (
    <div className="bg-black flex flex-col items-center justify-center p-10 sm:p-0">
        <div className="flex flex-col sm:flex-row sm:w-aboutWidth mt-10 sm:mt-20">
            <div className="flex-1 sm:mr-5 flex flex-col">
                <div className="relative h-36 sm:w-full bg-green">
                  <Image src="/images/Friends Academy.png" layout={"fill"} objectFit="cover" alt="logo"/>
                </div>
                <p className="text-white text-lg mt-4">We have implemented more interactive teaching style unlike the conventional methods. We suggest you to join us to sharpen up your interpersonal & consultation skills to enable you to pass your examination in the first attempt.</p>
            </div>
            <div className="flex-1 sm:mr-5 mt-10 sm:mt-0">
                <h1 className="text-white text-2xl">Events</h1>
                <div className="mt-2  flex items-center justify-start">
                    <div className='mr-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-20 border-green"></div>
                </div>
            </div>
            <div className="flex-1 sm:mr-5 mt-10 sm:mt-0">
                <h1 className="text-white text-2xl">Contact Us</h1>
                <div className="mt-2  flex items-center justify-start">
                    <div className='mr-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-20 border-green"></div>
                </div>
                <div className='mt-10'>
                    <PhoneIcon className='text-green scale-125'/>
                    <a className='ml-4 text-xl text-white hover:underline hover:text-green duration-300 cursor-pointer'>+44 7532 707561</a>
                </div>
                <div className='mt-4'>
                    <PhoneIcon className='text-green scale-125'/>
                    <a className='ml-4 text-xl text-white hover:underline hover:text-green duration-300 cursor-pointer'>+ 44 7449 347301</a>
                </div>
                <div className='mt-4 flex items-center'>
                    <MailIcon className='text-green scale-125'/>
                    <div>
                        <label className='ml-4 text-xl text-white hover:underline hover:text-green duration-300 cursor-pointer'>team@friendsacademy.co.uk</label>
                    </div>
                </div>
                <div className='mt-4 flex items-center'>
                    <LocationOnIcon className='text-green scale-125'/>
                    <div className="ml-4">
                        <p className='text-xl text-white'>113-115 Smedley Road Manchester M8 0RS</p>
                    </div>    
                </div>
                <div className='mt-10 flex justify-center sm:justify-start'>
                        <a href='https://wa.me/447449347301?text=I want to inquire about Plab 2' target="_blank" rel="noreferrer" className=' h-10 w-10 border border-lightGray rounded-full flex items-center justify-center text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <WhatsAppIcon className=''/>
                        </a>
                        <a href='https://www.facebook.com/friendsacademymanchester' target="_blank" rel="noreferrer" className=' h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <FacebookIcon className=''/>
                        </a>
                        <div className=' h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <YouTubeIcon className=''/>
                        </div>
                        <div className='h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <TwitterIcon className=''/>
                        </div>
                        <div className='h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <InstagramIcon className=''/>
                        </div>
                </div>
            </div>
            <div className="flex-1 sm:mr-5 mt-10 sm:mt-0">
                <h1 className="text-white text-2xl">Popular</h1>
                <div className="mt-2  flex items-center justify-start">
                    <div className='mr-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-20 border-green"></div>
                </div>
            </div>
        </div>
        <div className=" border-t-footer border-gray w-screen sm:w-full mt-14"></div>
        <div className="text-lightGray mt-5 sm:my-5 flex">
            <CopyrightIcon/>
            <p className="ml-2">Copyrights {date} <a className="text-green">Friends Academy</a> All Rights Reserved. Friends Academy | Developed By <a href="https://twitter.com/usamamaqsood25" target="_blank"  rel="noreferrer" className="text-green">Usama Maqsood.</a></p>
        </div>
    </div>
  )
}

export default Footer