import Image from "next/image"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState, useRef } from "react";
import Typewriter from 'typewriter-effect'

const Slider = () => {

  const [ index, setIndex ] = useState(0)
  const images = [
    "/images/slider4thimage.jpeg", "/images/main.jpeg", "/images/main2.jpg", "/images/main3.jpg", 
  ]

  const handleArrow = (e) => {

    if(e == "left"){
      index !== 0 ? setIndex(index - 1) : setIndex(3)
    }
    else if(e == "right"){
      index !== 3 ? setIndex(index + 1) : setIndex(0)
    }
  }

  const slideShow = () => {
    if(index == 3){
      setIndex(0)
    }
    else{
      setIndex(index + 1)
    }
  }

  useEffect(() => {

    const timer = setTimeout(() => {
      slideShow()
    }, 3000)

    return () => clearTimeout(timer)

  }, [index])

  return (
    <div className="relative sm:h-slider overflow-hidden font-main">
      <div className="absolute z-30 text-white font-bold text-6xl w-screen flex items-center justify-center mt-28">
        <Typewriter
            onInit={(typewriter) => {
              typewriter
              .typeString("Leading PLAB-2 Instructors in Town").start()
            } }
            options={{
              autoStart: true, delay:100
            }}
          />
      </div>
    
      <div className="w-full absolute h-aboutPic bg-black sm:h-full top-0 bottom-0 left-0 right-0 z-10 opacity-20"></div>
      <div className="flex h-aboutPic sm:h-full w-picturesWrapper duration-1000 ease-in-out" style={{transform: `translateX(${-100*index}vw)`}}>       
          {images.map((img, i) => {
            return(
              <div className="w-screen relative h-full" key={i}>
                <Image src={img} alt="image" layout="fill" objectFit="cover"/>
              </div>
            )
          })}
      </div>
      <div className="hidden sm:h-20 sm:w-10 sm:flex sm:items-center sm:justify-center sm:absolute sm:top-56 sm:bottom-0 sm:left-20  sm:text-white sm:cursor-pointer sm:hover:text-green sm:z-20" onClick={() => handleArrow("left")}>
          <ArrowBackIosIcon className="scale-arrow ml-8"/>
      </div>
      <div className="hidden sm:h-20 sm:w-10 sm:flex sm:items-center sm:justify-center sm:absolute sm:top-56 sm:bottom-0 sm:right-20  sm:text-white sm:cursor-pointer sm:hover:text-green sm:z-20" onClick={() => handleArrow("right")}>
          <ArrowForwardIosIcon className="scale-arrow"/>
      </div>

        {/* <motion.div className=" sm:absolute p-8 sm:top-16 sm:left-1/2 sm:w-box sm:rounded-lg bg-white sm:z-30 sm:p-12 flex flex-col"
          animate={{scale: 1, opacity: 1}}
          initial={{scale: 0.5, opacity: 0}}
          transition={{
          type: "spring", duration: 2
          }}
        >
            <h1 className="text-4xl font-extrabold">No matter how good you are at anything a Coach makes you better</h1>
            <div className="mt-5 sm:mt-10 sm:flex justify-between">
              <input className="border-lightGray w-full sm:w-56 border p-4 rounded-md outline-black" placeholder="Your Name"/>
              <input className="border-lightGray w-full sm:w-56 mt-5 sm:mt-0 border p-4 rounded-md outline-black" placeholder="Your Email"/>
            </div>
            <button className="bg-green p-5 text-white font-bold mt-5 sm:mt-10 text-xl rounded-md hover:bg-pink duration-300">Subscribe Now</button>
        </motion.div>  */}
    </div>
  )
}

export default Slider