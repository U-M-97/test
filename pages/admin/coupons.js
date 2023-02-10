import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { TextField, MenuItem, ButtonBase } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react"
import axios from "axios";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Coupons = () => {

    const date = new Date()

    const [ dialog, setDialog ] = useState(false)
    const [ discountOn, setDiscountOn ] = useState("Choose One")
    const [ courses, setCourses ] = useState()
    const [ coupons, setCoupons ] = useState()
    const [ isEndDate, setIsEndDate ] = useState(true)
    const [startDate, setStartDate] = useState(dayjs(date));
    const [endDate, setEndDate] = useState(dayjs(date));
    const [ limitUsers, setLimitUsers ] = useState(false)
    const [ inputs, setInputs ] = useState({
        couponCode: "",
        couponName: "",
        discount: "",
        discountType: "£",
        discountOn: "",
        startDate: dayjs(date).format("DD/MM/YYYY"),
        endDate: "",
        totalUsers: "unlimited",
        startDate: "",
        endDate: ""
    })
    const [ isInputs, setIsInputs ] = useState(true)
    const [ apiRes, setApiRes ] = useState(false)
    const [ rows, setRows ] = useState()
    const [ category, setCategory ] = useState()

    const handleStartDate = (newValue) => {
        setStartDate(newValue)
        setInputs((input) => ({...input, startDate: dayjs(newValue).format("DD/MM/YYYY")}))
    };

    const handleEndDate = (newValue) => {
        setEndDate(newValue)
        setInputs((input) => ({...input, endDate: dayjs(newValue).format("DD/MM/YYYY")}))
    };

    const getCourses = async () => {
        const res = await axios.get(`${process.env.url}/courses`)
        setCourses(res.data)
    }

    const getCoupons = async () => {
        const res = await axios.get(`${process.env.url}/coupon`)
        setCoupons(res.data)
    }

    useEffect(() => {
        getCourses()
        getCoupons()
    }, [])

    const handleDelete = async (id) => {
        const delCoupon = await axios.delete(`${process.env.url}/coupon`, { data: id})
        if(delCoupon.data === "Coupon Deleted Successfully"){
            getCoupons()
        }
    }

    const handleEdit = (id) => {
        const coupon = coupons && coupons.find((item) => {
            if(item._id === id){
                return item
            }
        })

        setInputs((input) => ({
            ...input, couponCode: coupon.code, couponName: coupon.name, discount: coupon.discount, discountType: coupon.discountType, discountOn: coupon.discountOn, endDate: coupon.endDate, startDate: coupon.startDate, totalUsers: coupon.usersLimit
        }))
        setIsEndDate(true)
        setStartDate(dayjs(coupon.startDate, "DD/MM/YYYY"))
        setEndDate(dayjs(coupon.endDate, "DD/MM/YYYY"))
        handleOpen()
    }
    
    const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'couponName', headerName: 'Coupon Name', width: 130 },
    { field: 'couponCode', headerName: 'Coupon Code', width: 130 },
    { field: 'discount', headerName: 'Discount', width: 100 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'uses', headerName: 'Uses', width: 100 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    { field: 'removeButton', headerName: "Delete", width: 70,
        renderCell: (params) => {
            return(
                <DeleteIcon className="ml-2 cursor-pointer text-red-600" onClick={() => handleDelete(params.row._id)}/>
            )
        }
    }, 
    { field: 'editButton', headerName: "Edit", width: 70,
    renderCell: (params) => {
        return(
            <MoreVertIcon className="ml-2 cursor-pointer text-blue-600" onClick={() => handleEdit(params.row._id)}/>
        )
    }
}
  ];
  
  const getRows = () => {
    let arr = []
    let count = 1
    coupons && coupons.map((coupon) => {
        return(
            arr.push({_id: coupon._id, id: count++, couponName: coupon.name, couponCode: coupon.code, discount: coupon.discount, type: coupon.discountType, uses: coupon.totalUses, status: coupon.status, startDate: coupon.startDate, endDate: coupon.endDate})
        )
    })
    setRows(arr)
  }

  useEffect(() => {
    getRows()
    setCategory("All")
  }, [coupons])

  const handleClose = () => {
    setDialog(false)
  }

  const handleOpen = () => {
    setDialog(true)
  }

  const handleApplyTo = (e) => {
    if(e.target.value === "All Courses"){
        setDiscountOn(e.target.value)
        setInputs((input) => ({...input, discountOn: e.target.value}))
    }else{
        setDiscountOn(e.target.value)
        setInputs((input) => ({...input, discountOn: courses[0].title}))
    }
  }

  const handleIsEndDate = () => {
    if(isEndDate === true){
        setIsEndDate(false)
        setInputs((input) => ({...input, endDate: null}))
    }else{
        setIsEndDate(true)
        setInputs((input) => ({...input, endDate: dayjs(date).format("DD/MM/YYY")}))
        setEndDate(dayjs(date))
    }
  }

  const handleLimitUsers = () => {
    if(limitUsers === true){
        setLimitUsers(false)
        setInputs((input) => ({...input, totalUsers: "unlimited"}))
    }else{
        setLimitUsers(true)
    }
  }

  const handleCreate = async () => {

    if(inputs.couponCode != "" && inputs.couponName != "" && inputs.discount != "" && inputs.discountType != "" && inputs.discountOn != "" && inputs.startDate != "" && (isEndDate === true ? inputs.endDate != "" : inputs.endDate === null) && (limitUsers === true ? inputs.totalUsers != "" : inputs.totalUsers === "unlimited")){
        setApiRes(true)
        setIsInputs(true)
        const res = await axios.post(`${process.env.url}/coupon`, inputs)
        if(res.data === "Coupon Created Successfully"){
            setApiRes(false)
            handleClose()
            getCoupons()
            setEndDate(false)
            setEndDate("")
            setInputs((input) => ({...input,  couponCode: "",  couponName: "",  discount: "",  discountType: "£", discountOn: "", startDate: dayjs(date).format("DD/MM/YYYY"), endDate: dayjs(date).format("DD/MM/YYYY"), totalUsers: "unlimited",}))     
        }
    }else{
       setIsInputs(false)
    }
  }

  const handleNewCoupon = () => {
    setInputs((input) => ({...input,  couponCode: "",  couponName: "",  discount: "",  discountType: "£", discountOn: "", startDate: dayjs(date).format("DD/MM/YYYY"), endDate: null, totalUsers: "unlimited",})) 
    setStartDate(dayjs(date))   
    setIsEndDate(false) 
    handleOpen()
  }
  console.log(coupons)
  console.log(inputs)
  
    return (
        <ThemeProvider theme={theme}>
            <FullLayout>
                <div className="flex justify-between items-center mb-10">
                    <TextField select  className="w-80">
                        <MenuItem>
                            
                        </MenuItem>
                    </TextField>
                    <h1 className="text-2xl font-medium">Coupons</h1>
                    <button className="mr-40 bg-green w-52 flex items-center justify-center py-2 text-xl font-medium rounded-full" onClick={handleNewCoupon}>
                        <AddIcon className="scale-125"/>
                        <p className="ml-2">New Coupon</p>
                    </button>  
                </div>
                {
                    rows && <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            />
                            </div>
                }
               
                <Dialog open={dialog} onClose={handleClose} scroll="paper" maxWidth="false">
                    { apiRes === false ? 
                    <div className="w-dialog h-dialogContainer">
                        <DialogTitle style={{fontSize: "20px" , fontWeight: "600"}} className="border-b border-lightGray">New Coupon</DialogTitle>
                        <DialogContent className="mt-5 h-dialog overflow-y-scroll">
                            <div className="flex px-5 justify-between text-lg">
                                <div className="flex-1">
                                    <p>Coupon Code</p>
                                    <input value={inputs.couponCode} placeholder="e.g, FRIENDSGIFT" className="rounded-md border-2 border-slate-300 mt-2 w-72 px-2 py-1 hover:bg-slate-100 focus:border-green outline-none" onChange={(e) => setInputs((input) => ({...input,couponCode: e.target.value}))}/>
                                </div>
                                <div className="flex-1">
                                    <p>Coupon Name</p>
                                    <input value={inputs.couponName} placeholder="e.g, FRIENDS GIFT" className="rounded-md border-2 border-slate-300 mt-2 w-72 px-2 py-1 hover:bg-slate-100 focus:border-green outline-none" onChange={(e) => setInputs((input) => ({...input,couponName: e.target.value}))}/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-5 px-5 text-lg">
                                <div className="flex-1">
                                    <p>Discount</p>
                                    <input value={inputs.discount} type="number" min={0} placeholder={inputs.discountType}  className="rounded-md border-2 border-slate-300 w-72 mt-2 px-2 py-1 hover:bg-slate-100 focus:border-green outline-none" onChange={(e) => setInputs((input) => ({...input,discount: e.target.value}))}/>
                                </div>
                                <div className=" flex-1">
                                    <p>Discount Type</p>
                                    <select className="w-72 mt-2  border-2 border-slate-300 rounded-md px-2 py-1 focus:border-green outline-none cursor-pointer" onClick={(e) => setInputs((input) => ({...input, discountType: e.target.value}))}>
                                        <option value="£">£</option>
                                        <option value="%">%</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-5 px-5 text-lg">
                                <div className="flex-1">
                                    <p>Apply To</p>
                                    <select className="w-72 mt-2  border-2 border-slate-300 rounded-md px-2 py-1 focus:border-green outline-none cursor-pointer" onChange={handleApplyTo}>
                                        <option disabled selected hidden>Choose One</option>
                                        <option value="All Courses">All Courses</option>
                                        <option value="Specific Course">Specific Course</option>
                                    </select>                              
                                </div>                            
                                { discountOn === "Specific Course" ? 
                                    <div className="flex-1">
                                    <p>Choose Course</p>
                                    <select className="w-72 mt-2 border-2 border-slate-300 rounded-md px-2 py-1 focus:border-green outline-none cursor-pointer" onChange={(e) => setInputs((input) => ({...input, discountOn: e.target.value}))}>
                                        {courses && courses.map((course) => {
                                            return(
                                                <option value={course.title} key={course}>{course.title}</option>
                                            )
                                        })}
                                    </select>
                                </div> : null
                                }
                            </div>
                            <div className="mt-10 px-5 text-lg flex flex-col">
                                <p>Valid Between</p>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div className="flex items-center mt-5">
                                        <div className="w-40">
                                            <DesktopDatePicker
                                            label="Start Date"
                                            inputFormat="DD/MM/YYYY"
                                            value={startDate}
                                            onChange={handleStartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                            />                              
                                        </div>
                                        <div className={`ml-5 w-40 ${isEndDate === false ? "invisible" : null}`}>                                 
                                            <DesktopDatePicker
                                            label="End Date"
                                            inputFormat="DD/MM/YYYY"
                                            value={endDate}
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField {...params} />}
                                            />                                   
                                        </div>
                                        <div className="flex items-center ml-10 cursor-pointer" onClick={handleIsEndDate}>
                                            <Checkbox checked={isEndDate === true ? false : true}/>
                                            <p>Dont set an End Date</p>                    
                                        </div>                                    
                                    </div>
                                </LocalizationProvider>
                            </div>
                            <div className="text-lg mt-10 px-5">
                                <p>Limit Uses</p>
                                <div className="flex items-center cursor-pointer" onClick={handleLimitUsers}>
                                    <Checkbox checked={limitUsers === false ? false : true}/>
                                    <p>Limit the total number of uses for this coupon</p>
                                </div>
                                { limitUsers === true ? <input value={inputs.totalUsers} placeholder="Max Users" type="number" min={0} className="rounded-md border-2 border-slate-300 mt-2 w-72 px-2 py-1 hover:bg-slate-100 focus:border-green outline-none" onChange={(e) => setInputs((input) => ({...input,totalUsers: e.target.value}))}/> : null }
                            </div>
                        </DialogContent>
                        <div className="mt-5 flex justify-end items-center text-lg font-medium my-5 mr-5">
                            {isInputs === false ? <Alert severity="error" className="">Please fill the required fields!</Alert> : null }
                            <button className="py-1 px-8 rounded-full border-black border" onClick={handleClose}>Cancel</button>
                            <button className="py-1 px-8 rounded-full bg-green ml-5 border border-green hover:bg-greenHover" onClick={handleCreate}>Create Coupon</button>
                        </div>
                    </div> : 
                    <div className="w-dialog h-dialogContainer flex items-center justify-center">
                        <CircularProgress/> 
                    </div>
                    } 
                </Dialog>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Coupons