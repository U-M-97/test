import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FiBookOpen } from 'react-icons/fi';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {

  const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
  const {ref: card1, inView: isCard1} = useInView({triggerOnce: true})
  const {ref: card2, inView: isCard2} = useInView({triggerOnce: true})
  const {ref: card3, inView: isCard3} = useInView({triggerOnce: true})

  return (
    <div className="font-main flex flex-col justify-center items-center my-10 bg-servicesBG w-screen sm:w-full">
      <div ref={header}>
        <motion.div
        initial={{opacity: 0, scale: 0}}
        animate={isHeader && {opacity: 1, scale: 1}}
        transition={{duration: 0.5}}
        className=" flex flex-col items-center mt-10"
        >
          <h1 className="text-4xl font-bold">Our Highlights</h1>
          <div className="w-56 mt-2 flex items-center justify-center">
            <div className="border-b-2 w-28 border-green"></div>
            <div className='mx-3'>
                <div className="h-2 w-2 rounded-full bg-pink"></div>
            </div>  
            <div className="border-b-2 w-28 border-green"></div>
          </div>
        </motion.div>
      </div>
      
      <div ref={card1} className="mt-10 sm:mt-20">
        <motion.div 
        initial={{y: "150px"}}
        animate={isCard1 && {y: "0px"}}
        transition={{duration: 1}}
        className=" flex items-center justify-center flex-col sm:flex-row ">
          <div className="sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <PaidIcon className='scale-services ml-4 mt-6 text-green group-hover:text-white '/>
            <h1 className='mt-11 text-2xl font-bold'>Pay Only Once</h1>
            <p className='mt-4 text-lg'>Pay only once and attend the course as many times as you want till you pass.</p>
          </div>
          <div className=" sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <PeopleIcon className=' scale-services ml-5 mt-6 text-green group-hover:text-white'/>
            <h1 className='mt-11 text-2xl font-bold'>Interactive PLAB 2 Practice Sessions</h1>
            <p className='mt-4 text-lg'>Rather than whiteboard teaching we offer live (simulated) patient doctor roleplay</p>
          </div>
          <div className=" sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <HandshakeIcon className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
            <h1 className='mt-11 text-2xl font-bold'>Unlimited Career Support</h1>
            <p className='mt-4 text-lg'>We shall help you to choose the career in UK according to your desires.</p>
          </div> 
        </motion.div>
      </div>

      <div ref={card2} className="sm:mt-10">
        <motion.div 
        initial={{y: "150px"}}
        animate={isCard2 && {y: "0px"}}
        transition={{duration: 1}}
        className=" flex items-center justify-center flex-col sm:flex-row">
          <div className="sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <AssignmentIndIcon className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
            <h1 className='mt-11 text-2xl font-bold'>Support with CV Building</h1>
            <p className='mt-4 text-lg'>We shall guide you to write a professional CV to help secure a job.</p>
          </div>
          <div className="sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <AiOutlineFileSearch className=' scale-services ml-3 mt-6 text-green group-hover:text-white'/>
            <h1 className='mt-11 text-2xl font-bold'>Support with Job Search</h1>
            <p className='mt-4 text-lg'>We shall help and guide you to hunt the appropriate first job to start your career in UK.</p>
          </div>
          <div className="sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <FiBookOpen className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
            <h1 className='mt-11 text-2xl font-bold'>Interview Guidance</h1>
            <p className='mt-4 text-lg'>We shall prepare you for the successful interview.</p>
          </div>
        </motion.div>
      </div>
     
      <div ref={card3} className="sm:mt-10 mb-10">
        <motion.div 
        initial={{y: "150px"}}
        animate={isCard3 && {y: "0px"}}
        transition={{duration: 1}}
        className="flex items-center justify-center flex-col sm:flex-row">
          <div className="sm:h-card sm:w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
            <SchoolIcon className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
            <h1 className='mt-11 text-2xl font-bold'>Online and Onsite PLAB 2 Courses</h1>
            <p className='mt-4 text-lg'>There is a course every month and you can join online or onsite according to your availability.</p>
          </div>
        </motion.div>
      </div>
      

    </div>
  )
}

export default Services