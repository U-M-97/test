import React from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next"
import axios from "axios";
import { useState, useEffect } from "react"
import { loginSuccess, logout } from "../../redux/adminReducer";
import CircularProgress from '@mui/material/CircularProgress'

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const [ loading, setLoading ] = useState(false)
  
  useEffect(() => {

    const handleStart = (url) => {
      if(url !== router.asPath){
        setLoading(true)
      }
    }

    const handleComplete = (url) => {
      if(url === router.asPath){
        setLoading(false)
        setTimeout(() =>{setLoading(false)},5000)
      }
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })

  const dispatch = useDispatch()
  const router = useRouter()
  const cookieExist = getCookie("token");

  const checkCookie = async () => {
    const res = await axios.get(`${process.env.url}/adminAuth`, { params: {cookieExist} } )
    if(res.data !== "Cookie not exists"){
      dispatch(loginSuccess(res.data))
    }else{
      dispatch(logout())
      router.push("/admin/adminLogin")
    }
  }

  useEffect(() => {
    if(cookieExist){
      checkCookie()
    }else{
      dispatch(logout())
    }
  }, [])

  const admin = useSelector((state) => state.admin.admin)
  
  if(admin != null){
    return (
    <>
      {
      loading === true ? 
      <div className="h-screen flex items-center justify-center">
        <CircularProgress/>
      </div>
      :

        <MainWrapper>
          <Header
            sx={{
              paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
              backgroundColor: "#fbfbfb",
            }}
            toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          <PageWrapper>
            <Container
              maxWidth={false}
              sx={{
                paddingTop: "20px",
                paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
              }}
            >
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
              {/* <Footer /> */}
            </Container>
          </PageWrapper>
        </MainWrapper>
      }
    </>
    );
  }else{
    router.push("/admin/adminLogin")
  }
}

export default FullLayout
