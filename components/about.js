import Image from "next/image"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const {ref: intro, inView: isIntro} = useInView({triggerOnce: true})
    const {ref: intro2, inView: isIntro2} = useInView({triggerOnce: true})

  return (
    <div className="font-main mb-20 flex flex-col items-center" id="about">
        <div ref={header}>
            <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={isHeader && {opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className=" flex flex-col items-center mt-20"
            >
                <h1 className="text-4xl font-bold">About Us</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
         </div>

         <div ref={intro} className="sm:w-aboutWidth flex flex-col sm:flex-row mt-20">
            <motion.div 
            initial={{opacity:0}}
            animate={isIntro && {opacity:1}}
            transition={{duration: 1}}
            className="flex-1 flex flex-col order-last sm:order-first p-10 sm:p-0">
                <h1 className=" font-extrabold text-3xl">Dr Rehman Bashir</h1>
                <label className=" text-lg text-gray mt-2">GP Consultant (MBBS MRCGP).</label>
                <p className="mt-5 text-lg">Hi everyone this is Dr  Rehman Bashir. I am a General practitioner, working in primary care since 2017. I certainly am enthusiastic about mentoring and teaching young medical professionals and colleagues. </p>
                <p className="mt-5 text-lg">I would love to share my experience in order for you to to pass PLAB2 Exam comfortably and making sure your dream comes true!</p>
                <p className="mt-5 text-lg">I will teach you the mandatory set of consultation and interpersonal skills to ace your exam. I will take you through General practice, ethical, challenging scenarios & manniquins which covers major chunk of your exam.</p>
                <p className="mt-5 text-lg">Come and join Friends Academy to pass PLAB2 and leant to become a patient-cantered clinician from here on.</p>
            </motion.div>

            <motion.div
            initial={{scale: 0}}
            animate={isIntro && {scale: 1}}
            transition={{duration: 2}}
            className="flex-1 flex justify-end">
                <div className=" border-aboutPic border-green relative flex items-center justify-center mr-5 sm:mr-0 h-80 w-64 sm:h-aboutPic sm:w-aboutPic">
                    <div className="absolute right-8 sm:right-0 -left-20 -top-10 sm:-top-12 sm:bottom-0 sm:-left-16">
                        <Image src="/images/Rehman.jpeg" height={"550px"} width={"500px"} objectFit="cover" alt="Profile Pic"/>
                    </div>
                </div>
            </motion.div>
         </div>

         <div ref={intro2} className="sm:w-aboutWidth flex flex-col sm:flex-row mt-16 sm:mt-36">
            <motion.div 
            initial={{opacity:0}}
            animate={isIntro2 && {opacity:1}}
            transition={{duration: 1}}
            className="flex-1 flex flex-col order-last sm:order-first p-10 sm:p-0">
                <h1 className=" font-extrabold text-3xl">Dr Sohail Tariq</h1>
                <label className=" text-lg text-gray mt-2">Medicine Trainee in Health Education England/Working in NHS.</label>
                {/* <p className="mt-5 text-lg">Yes, I know my stuff! And throughout our coaching time, you will develop the tools and confidence to take action. My way of coaching is to empower you in becoming the Leader you want to be. You are unique and so your coaching should be too. I don’t follow a template, or ‘one size fits all’. We start where you are & we work towards your goals. If you want a business that generates you income while also positively contributing to others, then you have arrived at the right place!</p>
                <p className="mt-5 text-lg">Whether you have an existing business, or you’ve an idea that you want to bring to life, there is a way to create a positive triple bottom-line company: profit-people-planet all winning. No longer are these areas mutually exclusive, you can have it all and do good at the same time!</p> */}

            </motion.div>

            <motion.div 
            initial={{scale: 0}}
            animate={isIntro2 && {scale: 1}}
            transition={{duration: 2}}
            className="flex-1 flex justify-end">
                <div className=" border-aboutPic border-green relative flex items-center justify-center mr-5 sm:mr-0 h-80 w-64 sm:h-aboutPic sm:w-aboutPic">
                    <div className="absolute right-8 sm:right-0 -left-20 -top-10 sm:-top-12 sm:bottom-0 sm:-left-16">
                        <Image src="/images/Sohail Tariq2.jpeg" height={"550px"} width={"500px"} objectFit="cover" alt="Profile Pic"/>
                    </div>
                </div>
            </motion.div>
         </div>
    </div>
  )
}

export default About