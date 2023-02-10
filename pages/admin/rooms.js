import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import axios from 'axios';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, InputLabel, Select} from "@mui/material"
import { TextField, MenuItem, Avatar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/adminReducer';

const Rooms = () => {

    const [ rows, setRows ] = useState()
    const [ rooms, setRooms ] = useState()
    const [ dialog, setDialog ] = useState(false)
    const [ inputs, setInputs ] = useState({
        id: "",
        roomImage: "",
        roomTitle: "",
        roomType: "",
        roomBeds: "",
    })
    const [ file, setFile ] = useState(null)
    const [ imageUploading, setImageUploading ] = useState(false)
    const [ apiRes, setApiRes ] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs((prev) => ({
            ...prev, [name]:value
        }))
      }
    
    const getRooms = async () => {
        const roomsRes = await axios.get(`${process.env.url}/room`)
        setRooms(roomsRes.data)
    }

    const getRows = () => {
        let arr = []
        let count = 1
        rooms && rooms.map((room) => {
            return(
                arr.push({room: room, _id:room._id, id: count++, roomImage: room.image, roomTitle: room.roomTitle, roomType: room.roomType, roomBeds: room.roomBeds})
            )
        })
        setRows(arr)
    }

    const handleDelete = async (id) => {
        const data = {
            id: id,
            reqMethod: "Delete Room"
        }
        const res = await axios.delete(`${process.env.url}/room`, { data })
        if(res.data === "Room Deleted Successfully"){
          getRooms()
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'roomImage', headerName: 'Image', width: 100 },
        { field: 'roomTitle', headerName: 'Title', width: 200 },
        { field: 'roomType', headerName: 'Type', width: 100 },
        { field: 'roomBeds', headerName: 'Beds', width: 100 },
        { field: 'editButton', headerName: "Edit", width: 130, 
        renderCell: (params) => {

            const room = rooms && rooms.find((room) => {
                if(room._id === params.row._id){
                    return room
                }
            })

            return (
                <button className="py-2 px-5 bg-green rounded-sm hover:bg-greenHover" onClick={() => handleOpen(room)}>Edit</button>
            )
            }
        },
        { field: 'removeButton', headerName: "Delete", width: 130,
            renderCell: (params) => {
            return(
                <DeleteIcon className="ml-2 cursor-pointer text-red-600" onClick={() => handleDelete(params.row._id)}/>
            )
            }
        },
        { field: 'moreDetails', headerName: "Details", width: 150,
        renderCell: (params) => {

            const handleMoreDetails = () => {
                dispatch(addRoom(params.row.room))
                router.push("/admin/roomDetails")
            }

            return(
                <button className='bg-green py-2 px-5 rounded-sm hover:bg-greenHover' onClick={handleMoreDetails}>More Details</button>
            )
        }
    },
    ]

    const handleClose = (room) => {
        setDialog(false)
    }

    const handleOpen = (room) => {
        setDialog(true)
        setInputs((current) => {
            return{
                ...current, id: room._id, roomImage: room.roomImage, roomTitle: room.roomTitle, roomBeds: room.roomBeds
            }
        })
    }

    useEffect(() => {
        getRooms()
    }, [])

    useEffect(() => {
        getRows()
    }, [rooms])

    const handleImage = async () => {
        setImageUploading(true)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "friends-academy")
        const cloudinary = await axios.post("https://api.cloudinary.com/v1_1/codillionaire/image/upload", data)
        setInputs((current) => {
          return{
            ...current, roomImage: cloudinary.data.url
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
        const res = await axios.post(`${process.env.url}/room`, inputs) 
        console.log(res.data)
        if(res.data != "Course Updated Successfully"){
          handleClose()
          setApiRes(false)
          getRooms()
        }
    }

  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
            <div className='font-main'>
                <div className='flex items-center justify-center'>
                    <button className='mb-5 bg-green rounded-md py-2 px-4 text-lg font-bold hover:bg-greenHover hover:text-white' onClick={handleOpen}>Add New Room</button>
                </div>
                <div className=" h-screen w-full">
                    {rows && 
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[5]}
                        />
                    }
                </div>

                <Dialog open={dialog} onClose={handleClose} scroll="paper">
                    <DialogTitle style={{fontSize: "20px" , fontWeight: "600"}}>Add or Update Room</DialogTitle>
                    <DialogContent className="w-aboutPic">
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
                            autoFocus
                            name="roomTitle"     
                            margin="normal"
                            label="Room Title"
                            fullWidth
                            variant="standard"
                            defaultValue={inputs.roomTitle}
                            onChange={handleChange}
                            />
                            <TextField
                            name="roomType"     
                            margin="normal"
                            label="Room Type"
                            fullWidth
                            variant="standard"
                            defaultValue={inputs.roomType}
                            onChange={handleChange}
                            />
                            <TextField inputProps={{min: 0}} name="roomBeds" margin="normal" fullWidth type="number" label="Room Beds" variant="standard" defaultValue={inputs.roomBeds} onChange={handleChange}/> 
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
                </Dialog> 
            </div>  

            
        </FullLayout>
    </ThemeProvider>
  )
}

export default Rooms