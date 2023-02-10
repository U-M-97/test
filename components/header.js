import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/header.module.css"
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from "next/link"
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Link as Scroll } from "react-scroll"

const Header = () => {

    const [banner, setBanner] = useState(true)
    const user = useSelector((state) => state.user.currentUser)

    return(
        <div className='font-main overflow-x-hidden' id='header'>
            {/* {banner == true ? <div className={styles.headerOpen}>
                <div className={styles.headerContainer}>
                    <p className='mr-1 text-green'>Our New Address : </p>
                    <p className='mr-10'>113 - 115 Smedley Road, MANCHESTER</p>
                    <p className='mr-1 text-green'>Postcode : </p>
                    <p className='mr-10'>M8 0RS</p>
                    <p className='mr-1 text-green'>For more information contact : </p>
                    <p>07532707561</p>
                </div>
            </div>
            : null
            } */}
            
            
            <div className='flex justify-center sm:p-2 relative'>
                {/* <div className='absolute right-5 top-0 bg-green text-black cursor-pointer rounded-b-md sm:p-1' onClick={() => setBanner(!banner)}>
                    {banner == true ? <ClearIcon className='scale-75 md:scale-100'/> : <KeyboardArrowDownIcon/>}
                </div> */}
                <div className='flex mt-2 flex-col w-screen sm:mt-0 sm:flex-row sm:w-width sm:justify-between'>
                    <div className='px-3 sm:p-0 sm:flex justify-between sm:ml-32 items-center'>
                        <div className='flex cursor-pointer'>
                            <PhoneIcon className='text-green'/>
                            <address className='text-font not-italic hover:text-green duration-200'>+44 7532 707561</address>
                            <address className='text-font not-italic hover:text-green duration-200 ml-2'>+44 7449 347301</address>
                        </div>
                        
                        <Scroll className="cursor-pointer"
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={2000}
                        >
                            <div  className='flex cursor-pointer mt-2 sm:mt-0 sm:ml-8'>
                                <MailIcon className='text-green'/>
                                <address className='text-font not-italic hover:text-green duration-200'>team@friendsacademy.co.uk</address>
                            </div>
                        </Scroll>    
                    </div>

                    <div className='border-b border-lightGray mt-2 sm:hidden'></div>
                    
                    <div className='flex justify-center mt-2 sm:mr-40 sm:mt-0 items-center'>
                        <a href='https://wa.me/447449347301?text=I want to inquire about Plab 2' target="_blank" rel="noreferrer" className='hover:text-green duration-300 cursor-pointer mr-4'>
                            <WhatsAppIcon/>
                        </a>
                        <a href='https://www.facebook.com/friendsacademymanchester' target="_blank" rel="noreferrer" className='hover:text-green duration-300 cursor-pointer mr-4'>
                            <FacebookIcon/>
                        </a> 
                        <div className='hover:text-green duration-300 cursor-pointer mr-4'>
                            <YouTubeIcon/>
                        </div>
                        <div className={styles.line}></div>
                        <div className='mr-4 text-gray cursor-pointer'>
                            <SearchIcon className=' scale-125'/>
                        </div>
                        {user == null ? <div className='mx-4 cursor-pointer'>
                            <Link href="/account/signup">
                                <button className="py-2 px-4 bg-green rounded-md font-bold hover:bg-pink duration-300 hover:text-white">LOGIN</button>
                            </Link> 
                        </div> : null  }              
                    </div>   
                    
                    <div className='border-b border-lightGray mt-2 sm:hidden'></div>    
                </div>                
            </div>
        </div>
        
    )
}

export default Header