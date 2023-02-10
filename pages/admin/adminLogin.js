import { useState } from "react"
import axios from "axios"
import { loginSuccess } from "../../redux/adminReducer"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Alert from '@mui/material/Alert';

const AdminLogin = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch()
    const router = useRouter()
    const [ valid , setValid ] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs((prev) => ({
            ...prev, [name]:value
        }))
    }

    const handleLogin = async () => {
        const res = await axios.post(`${process.env.url}/adminAuth`, inputs)
        if(res.data === "Invalid Credentials"){
            setValid(true)
        }else{ 
            dispatch(loginSuccess(res.data))
            router.push("/admin")
        }
    }

    console.log(inputs)

  return (
    <div className="font-main flex flex-col items-center justify-center h-screen">
        <div>
            <label>Username</label>
            <input name="username" className="border-2 ml-5" onChange={handleChange}/>
        </div>
        <div className="mt-10">
            <label>Password</label>
            <input name="password" className="border-2 ml-5" onChange={handleChange}/>
        </div>

        <button className="mt-10 bg-green py-2 px-8 rounded-md text-xl font-bold hover:bg-greenHover" onClick={handleLogin}>Login</button>
        {valid === true ? <Alert severity="error" className="mt-5">Invalid Credentials</Alert> : null}
    </div>
  )
}

export default AdminLogin