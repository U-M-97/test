import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CancelIcon from '@mui/icons-material/Cancel';

const DiscountHeader = ({close}) => {

    const coupons = useSelector((state) => state.coupon.coupons)
    const [ outputs, setOutputs ] = useState({
        discount: "",
        discountOn: "",
        discountType: "",
        endDate: ""
    })
    
    useEffect(() => {
        coupons && setOutputs((output) => ({...output, discount: coupons[0].discount, discountOn: coupons[0].discountOn, discountType: coupons[0].discountType, endDate: coupons[0].endDate}))
    },[])

  return (
    <div className="font-main flex justify-between items-center border-t bg-saleHeader border-lightGray px-2 sm:px-7">
        {outputs && 
            <div className="flex items-center justify-center sm:w-11/12 sm:h-10">
                <motion.p className="font-bold sm:text-xl bg-white rounded-full px-2 sm:px-4 flex"
                animate={{color: ["#000000", "#66ff99", "#000000",], scale: [0.9,1,0.9]}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear"}}
                >
                    <p>SALE </p>
                    <p className="ml-2">!</p>
                </motion.p>
                <motion.p
                animate={{scale: [1,1.04,1]}}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut"}}
                className="ml-5 sm:text-xl font-medium">{outputs.discount} {outputs.discountType} Discount on {outputs.discountOn} till {outputs.endDate}. Hurry up and Grab this limited offer right now</motion.p>
            </div>
        }
        <div className="cursor-pointer hover:text-white" onClick={close}>
         <CancelIcon/>  
        </div>
    </div>
  )
}

export default DiscountHeader