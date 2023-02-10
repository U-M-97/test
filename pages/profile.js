import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Alert from '@mui/material/Alert';

const Profile = () => {

  const user = useSelector((state) => state.user.currentUser)
  const [ userCourses, setUserCourses ] = useState()
  console.log(userCourses)

  useEffect(() => {
    user && user.courses.length != 0 ? setUserCourses(user.courses) : null
  }, [])

  return (
    <div className="h-screen font-main">
      <div className="flex mt-20 justify-center">
        <h1 className="font-bold text-xl">Your Course Bookings : </h1>
        <div className="flex flex-col">
          {userCourses && userCourses.map((course) => {
            return(
              <h1 className="ml-10 text-xl mb-2" key={course}>{course.title}</h1>
            )
          })}
        </div>
        {userCourses == null ? <Alert severity="error" className="mt-2 w-96">You have not registered any courses yet.</Alert> : null }
      </div> 
    </div>
  )
}

export default Profile