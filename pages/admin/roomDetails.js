import { useSelector } from 'react-redux';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"

const RoomDetails = () => {

    const room = useSelector((state) => state.admin.room)
    const [ rows, setRows ] = useState()
    console.log(room)
    const getRows = () => {
        let arr = []
        let count = 1
        room && room.roomMembers.map((member) => {
            return(
                arr.push({id: count++, name: member.name, gender: member.gender, phone: member.phone, email: member.email, checkIn: `${member.checkIn.date}/${member.checkIn.month + 1}/${member.checkIn.year}`, checkOut: `${member.checkOut.date}/${member.checkOut.month + 1}/${member.checkOut.year}`})
            )
        })
        setRows(arr)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'checkIn', headerName: 'Check In', width: 150 },
        { field: 'checkOut', headerName: 'Check Out', width: 150 },
        { field: 'payment', headerName: 'Payment', width: 150 },
    ]

    useEffect(() => {
        getRows()
    }, [room])

    useEffect(() => {

    }, [rows])

  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
            <div className='flex items-center justify-center'>
                <h1 className='text-xl font-bold'>Room Members</h1>
            </div>
            <div className=" h-screen w-full mt-10">
                {rows && 
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5]}
                    />
                }
            </div>
        </FullLayout>
    </ThemeProvider>
  )
}

export default RoomDetails