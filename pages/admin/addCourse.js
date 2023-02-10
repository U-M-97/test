import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress'
import dayjs from "dayjs";

const AddCourse = () => {

    const [ inputs, setInputs ] = useState({
        title: "",
        tagline: "",
        description: "",
        category: "",
        price: "",
        status: "",
        startDate: "",
        endDate: "",
    })
    const [file, setFile] = useState()
    const [courses, setCourses] = useState()
    const [categories, setCategories] = useState([])
    const [ valueCalendar, setValueCalendar ] = useState(new Date())
    const [ endDateValueCalendar, setEndDateValueCalendar ]  = useState(new Date())
    const [ calendar, setCalendar ] = useState(false)
    const [ calendar2, setCalendar2 ] = useState(false)
    const [ newCategory, setNewCategory ] = useState(false)
    const [ apiReq, setApiReq ] = useState(false)
    const [ displayStartDate, setDisplayStartDate ] = useState()
    const [ displayEndDate, setDisplayEndDate ] = useState()

    useEffect(() => {
      setCalendar(false)
      setCalendar2(false)
      console.log(valueCalendar)
      if(calendar == true){
        setInputs((current) => {
          return{
            ...current, startDate: valueCalendar
          }
        })
        setDisplayStartDate(dayjs(valueCalendar).format("DD/MM/YYYY"))
      }else if(calendar2 == true){
        setInputs((current) => {
          return{
            ...current, endDate: endDateValueCalendar
          }
        })
        setDisplayEndDate(dayjs(endDateValueCalendar).format("DD/MM/YYYY"))
      }
    }, [valueCalendar , endDateValueCalendar])

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs((prev) => ({
            ...prev, [name]:value
        }))
    }

    const handleSubmit = async () => {
      setApiReq(true)
      console.log(file)
      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "friends-academy")
      const cloudinary = await axios.post("https://api.cloudinary.com/v1_1/codillionaire/image/upload", data)
      const url = cloudinary.data.url
      const uploadData = {
          inputs,
          url
      }
      const res = await axios.post(`${process.env.url}/courses`, uploadData)
      if(res.data === "Course Added Successfully"){
        setApiReq(false)
        toast.success("Course Added Successfully")  
      }
    }

    const getCourses = async () => {
      const res = await axios.get(`${process.env.url}/courses`)
      setCourses(res.data)
    }

    useEffect(() => {
      getCourses()
    }, [])

    let arr = []

    useEffect(() => {
   
      courses && courses.map((course) => {
        arr.push(course.category)
      })

      const uniqueCategory = arr.filter((item, index) => categories.indexOf(item) === index)
      setCategories(uniqueCategory)
      let tmp = null
      courses && courses.map((item) => {
          if(item.category != tmp){
            arr.push(item.category)
              tmp = item.category
              return  
          }
      }) 
      // setCategories(arr)
    }, [courses])

    useEffect(() => {
        
      const handleKey = (e) => {
          const link = document.getElementById("calendar")
          const link2  = document.getElementById("calendar2")
          link && link.contains(e.target) || link2 && link2.contains(e.target) ? null : setCalendar(false) || setCalendar2(false)
      }
      document.addEventListener("mousedown" , handleKey)
      
      return () => {
          document.removeEventListener("mousedown", handleKey)
    }
    }, [calendar, calendar2])

  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
          { apiReq === false ? 
          <>
          <Grid container spacing={0} className="relative">
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add Course">
                <Stack spacing={3}>
                  <p>Upload Course Image</p>
                  <input type="file" name="image" className="w-52 cursor-pointer" onChange={(e) => setFile(e.target.files[0])}/>
                  <TextField name="title" label="Course Title" variant="outlined" onChange={handleChange}/>    
                  <TextField name="tagline" label="Tagline" variant="outlined" onChange={handleChange}/>         
                  <TextField multiline rows="10" name="description"  label="Course Description" variant="outlined" onChange={handleChange}/>
                  {newCategory == false ? <TextField
                    select
                    name="category"
                    label="Category"
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField> : newCategory && <TextField name="category" label="Add a new Category" variant="outlined" onChange={handleChange}/> }
                  <div className="flex flex-col items-start">
                    {newCategory == false ? <button className=" bg-dashboard p-2 rounded-md text-white" onClick={() => setNewCategory(!newCategory)}>Add New Category</button> : <button className=" bg-dashboard p-2 rounded-md text-white" onClick={() => setNewCategory(!newCategory)}>Select from Categories</button>}
                  </div>
                  <TextField type="number" name="price" label="Price in POUNDS(£)" variant="outlined"  onChange={handleChange}/> 
                  <FormControl>                
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select 
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="status"
                      value={inputs.status}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                  <input name="startDate" placeholder="Start Date" className=" w-96 mt-10 border border-black py-4 px-3 rounded-md " value={displayStartDate}  onClick={() => setCalendar(true)}/> 
                  {calendar && <div className="z-10 absolute bottom-60" id="calendar">
                    <Calendar className=" bg-white border-2" onChange={setValueCalendar} value={valueCalendar}/>
                  </div> }
                  <input name="endDate" placeholder="End Date" className=" w-96 mt-10 border border-black py-4 px-3 rounded-md " value={displayEndDate} onClick={() => setCalendar2(true)}/> 
                  {calendar2 && <div className="z-10 absolute bottom-40" id="calendar2">
                    <Calendar className=" bg-white border-2" onChange={setEndDateValueCalendar} value={endDateValueCalendar}/>
                  </div> }
                </Stack>
                <br />
                <Button variant="contained" mt={2} onClick={handleSubmit}>
                  Submit
                </Button>
              
              </BaseCard>
            </Grid>

          </Grid>
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
        </>
       : <div className="flex items-center justify-center h-dialogContainer">
          <CircularProgress/>
        </div>
        }
        </FullLayout>
    </ThemeProvider>
  )
}

export default AddCourse