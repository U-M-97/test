import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion"
import Image from 'next/image';

const PlabInfo = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const {ref: p1, inView: isP1} = useInView({triggerOnce: true})
    const {ref: p2, inView: isP2} = useInView({triggerOnce: true})
    const {ref: p3, inView: isP3} = useInView({triggerOnce: true})

  return (
    <div className="font-main flex flex-col items-center p-5 overflow-x-hidden text-justify">
        <div ref={header}>
            <motion.div 
                initial={{opacity: 0, scale: 0}}
                animate={isHeader && {opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                <h1 className="mt-10 text-4xl font-bold">What is PLAB 2 ?</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
        </div> 
        
        <div className='flex sm:flex-row flex-col-reverse items-center mt-10 sm:w-plabWidth'>
            <div ref={p1} className="  flex-1">
                <motion.p             
                    initial={{x: "-100%"}}
                    animate={isP1 && {x: "0%"}}
                    transition={{duration: 1}}
                    className="text-xl ">PLAB 2 is an objective structured clinical exam (OSCE). It's made up of 16 scenarios, each lasting eight minutes and aims to reflect real life settings including a mock consultation or an acute ward. Just imagine that you are going to see 16 patients in given time. It tests your ability to apply knowledge to the care of patients, not how well you can remember and recite facts.All the questions relate to current best practice followed in UK. You should answer them in relation to published evidence and not according to your local arrangements.
                </motion.p>
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <Image src={"/images/Illus2.png"} height={"400px"} width={"400px"}/>
            </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center mt-10 sm:w-plabWidth'>
            <div className='flex-1 flex items-center justify-center'>
                <Image src={"/images/Illus3.png"} height={"400px"} width={"400px"}/>
            </div>
            <div ref={p2} className="flex-1">
                <motion.p
                    initial={{x: "100%"}}
                    animate={isP2 && {x: "0%"}}
                    transition={{duration: 1}}
                    className="text-xl">The PLAB2 exam is divided into different setups: 1) A&E setting, 2) GP Surgery setting, 3) Medicine/Surgery/ward setting The OSCE scenarios can be in the form of: 1) History taking,  2)  Counselling,  3) Ethical,  4) Teaching,  5) Combined,  6) SIMMAN or Mannequins/ Examination. Any student attempting the exam will be tested and marked on following domains. These are as follows: 1). Data gathering, 2). Interpersonal skills 3). Management
                </motion.p>
            </div>  
        </div>

        <div className='flex flex-col-reverse sm:flex-row items-center mt-10 sm:w-plabWidth'>
            <div ref={p3} className="flex-1">            
                <motion.div
                initial={{x: "-100%"}}
                animate={isP3 && {x: "0%"}}
                transition={{duration: 1}}
                className="text-xl">It is very important to know what you should be expecting in your examination. It covers various aspects of medical practices which not only involves management of the clinical issues of the patients but also managing the non-clinical aspects of a patient's life. PLAB2 tests you at the FY2 level of what is expected from a doctor and knowing this knowledge is extremely important especially when you are coming from a different medical / health system.
                </motion.div>         
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <Image src={"/images/Illus1.png"} height={"400px"} width={"400px"}/>
            </div>
        </div>
    </div>
  )
}

export default PlabInfo