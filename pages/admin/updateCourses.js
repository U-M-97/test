import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect, useState } from "react"
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import { TextField, MenuItem, Avatar } from "@mui/material";
import { useRouter } from 'next/router'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, InputLabel, Select} from "@mui/material"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";

const UpdateCourses = () => {

  const [ courses, setCourses ] = useState()
  const [ rows, setRows ] = useState()
  const [ categories, setCategories ] = useState([])
  const [ selectedCategory, setSelectedCategory ] = useState()
  const router = useRouter()
  const [ dialog, setDialog ] = useState(false)
  const [ valueCalendar, setValueCalendar ] = useState(new Date())
  const [ endDateValueCalendar, setEndDateValueCalendar ]  = useState(new Date())
  const [ calendar, setCalendar ] = useState(false)
  const [ calendar2, setCalendar2 ] = useState(false)
  const [ inputs, setInputs ] = useState({
    id: "",
    image: "",
    title: "",
    tagline: "",
    description: "",
    category: "",
    price: "",
    status: "",
    startDate: "",
    endDate: "",
})
  const [ file, setFile ] = useState(null)
  const [ imageUploading, setImageUploading ] = useState(false)
  const [ apiRes, setApiRes ] = useState(false)
  const [ apiDelRes, setApiDelRes ] = useState(false)
  const [ displayStartDate, setDisplayStartDate ] = useState()
  const [ displayEndDate, setDisplayEndDate ] = useState()

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs((prev) => ({
        ...prev, [name]:value
    }))
  }

  useEffect(() => {
    setCalendar(false)
    setCalendar2(false)
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

  const getCourses = async () => {
    const res = await axios.get(`${process.env.url}/courses`)
    setCourses(res.data)
  }

  useEffect(() => {
    getCourses()
  },[])
  
  const handleClose = () => {
    setDialog(false)
  }

  const handleOpen = (course) => {
    setDialog(true)
    setDisplayStartDate(dayjs(course.startDate).format("DD/MM/YYYY"))
    setDisplayEndDate(dayjs(course.endDate).format("DD/MM/YYYY"))
    setInputs((current) => {
      console.log(course)
      return{
        ...current, id:course._id, image: course.image, title: course.title, tagline: course.tagline, description: course.description, category: course.category, price: course.price, status: course.status, startDate: course.startDate, endDate: course.endDate
      }
    })
  }

  // const handleDelete = async (id) => {
  //   setApiDelRes(true)
  //   const res = await axios.delete(`${process.env.url}/courses`, { data: id })
  //   if(res.data === "Course Deleted Successfully"){
  //     getCourses()
  //   }
  // }

  const getRowsAndColumns = () => {
    let arr = []
    let count = 1
    selectedCategory && courses && courses.map((course) => {
      console.log(course)
      if(course.category === selectedCategory) {
        return(
          arr.push({_id:course._id, id: count++, courseImage: course.image, courseTitle: course.title, courseStatus: course.status, courseStartDate: dayjs(course.startDate).format("DD MMMM, YYYY"), courseEndDate: dayjs(course.endDate).format("DD MMMM, YYYY")})
        )
      }
    })
    setRows(arr)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'courseImage', headerName: 'Image', width: 100 , 
    renderCell: (params) => {
      return (
        <>
          <Avatar src={params.row.courseImage}/>
        </>
      );
    } },
    { field: 'courseTitle', headerName: 'Course Title', width: 400 },
    { field: 'courseStatus', headerName: 'Status', width: 80,},
    { field: 'courseStartDate', headerName: 'Start Date', width: 160,},
    { field: 'courseEndDate', headerName: 'End Date', width: 160,},
    { field: 'editButton', headerName: "Edit", width: 130, 
    renderCell: (params) => {
      const course = courses.find((course) => {
        if(course._id === params.row._id){
          return course
        }
      })

      return(
        <>
         <button className="py-2 px-5 bg-green rounded-sm hover:bg-greenHover" onClick={() => handleOpen(course)}>Edit</button>
        </>
      )
    }
  },
  // { field: 'removeButton', headerName: "Delete", width: 130,
  //   renderCell: (params) => {
  //     return(
  //       <DeleteIcon className="ml-2 cursor-pointer text-red-600" onClick={() => handleDelete(params.row._id)}/>
  //     )
  //   }
  // } 
  ];

  useEffect(() => {

    let arr = []
    courses && courses.map((item) => {
          arr.push(item.category)
      }) 
      const uniqueCategory = arr.filter((item, index) => arr.indexOf(item) === index)
      setCategories(uniqueCategory)
      setSelectedCategory(uniqueCategory[0])
      setApiDelRes(false)
  }, [courses])

  useEffect(() => {
    getRowsAndColumns()
  }, [selectedCategory, courses])

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

  const handleImage = async () => {
    setImageUploading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "friends-academy")
    const cloudinary = await axios.post("https://api.cloudinary.com/v1_1/codillionaire/image/upload", data)
    setInputs((current) => {
      return{
        ...current, image: cloudinary.data.url
      }
    })
    setImageUploading(false)
  }

  useEffect(() => {
    if(file != null){
      handleImage()
    }
  }, [file])

   const handleSave = async () => {
    setApiRes(true)
    const res = await axios.put(`${process.env.url}/courses`, inputs) 
    console.log(res)
    if(res.data === "Course Updated Successfully"){
      handleClose()
      setApiRes(false)
      getCourses()
    }
   }
   console.log(inputs)

  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
          { apiDelRes === false ? 
          <>
          <div className="mb-8">
            <TextField
              select
              key={selectedCategory}
              defaultValue={selectedCategory}
              value={selectedCategory}
              name={"category"}
              label="Category"
              className="w-96"
            >
              {categories && categories.map((category) => (
                <MenuItem key={category} value={category} onClick={() => setSelectedCategory(category)}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </div>  
          {rows && 
              <div className=" h-screen w-full">
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[5]}
                />
              </div>  
          }
          <Dialog open={dialog} onClose={handleClose} scroll="paper" maxWidth="false">
          <div className="w-dialog h-dialogContainer">
            <DialogTitle style={{fontSize: "20px" , fontWeight: "600"}}>Edit Course</DialogTitle>
            <DialogContent className="">
              {
                inputs && apiRes == false ?
                <div className="flex flex-col items-center justify-center">
                  <div className="flex relative items-center">
                    { imageUploading == false ? <Avatar src={inputs.image} sx={{ width: 96, height: 96 }}/> : <CircularProgress/> }
                    <label for="file" className="ml-4 cursor-pointer bg-dashboard px-5 py-2 left-36 top-6 text-md hover:bg-green rounded-md">Change Image</label>
                    <input className="hidden" id="file" type="file" name="image" onChange={(e) => setFile(e.target.files[0])}/>
                  </div>
                  <div className="mt-4 relative">
                    <TextField
                      name="title"
                      autoFocus
                      margin="normal"
                      label="Course Title"
                      fullWidth
                      variant="standard"
                      defaultValue={inputs.title}
                      onChange={handleChange}
                    />
                    <TextField
                      name="tagline"
                      autoFocus
                      margin="normal"
                      label="Course Tagline"
                      fullWidth
                      variant="standard"
                      defaultValue={inputs.tagline}
                      onChange={handleChange}
                    />
                    <TextField
                      multiline 
                      rows="10"
                      name="description"
                      autoFocus
                      margin="normal"
                      label="Course Description"
                      fullWidth
                      variant="standard"
                      defaultValue={inputs.description}
                      onChange={handleChange}
                    />
                    <TextField
                      name="category"
                      autoFocus
                      margin="normal"
                      label="Category"
                      fullWidth
                      variant="standard"
                      defaultValue={inputs.category}
                      onChange={handleChange}
                    />
                     <TextField inputProps={{min: 0}} name="price" margin="normal" fullWidth type="number" label="Price in POUNDS(£)" variant="standard" defaultValue={inputs.price}  onChange={handleChange}/> 
                     <FormControl fullWidth margin="normal" variant="standard">                
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select 
                          name="status"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Status"
                          defaultValue={inputs.status}
                          onChange={handleChange}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl> 
                      <input name="startDate" placeholder="Start Date" className=" w-96 mt-10 border border-black py-4 px-3 rounded-md " value={displayStartDate} onClick={() => setCalendar(true)}/>
                      <input name="endDate" placeholder="End Date" className=" w-96 mt-10 border border-black py-4 px-3 rounded-md " value={displayEndDate} onClick={() => setCalendar2(true)}/>  
                      {calendar && <div className="z-10 absolute bottom-40" id="calendar">
                      <Calendar className=" bg-white border-2" onChange={setValueCalendar} value={valueCalendar}/>
                      </div> }
                      {calendar2 && <div className="z-10 absolute bottom-16" id="calendar2">
                        <Calendar className=" bg-white border-2" onChange={setEndDateValueCalendar} value={endDateValueCalendar}/>
                      </div> }
                  </div>
                </div> : 
                <div className="h-full flex items-center justify-center">
                  <CircularProgress/> 
                </div>     
              }
              
            </DialogContent>
            <DialogActions className=" border-lightGray border-t">
              <button onClick={handleClose} className="text-xl px-4 py-1 font-medium rounded-md">Cancel</button>
              <button onClick={handleSave} className="text-xl bg-dashboard px-4 py-1 font-medium hover:bg-green rounded-md">Save</button>
            </DialogActions>
            </div>
            </Dialog> 
            </>
            : 
            <div className="flex items-center justify-center mt-56">
              <CircularProgress/>
            </div>    
            }
        </FullLayout>
    </ThemeProvider>
        
  )
}

export default UpdateCourses