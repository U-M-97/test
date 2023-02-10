import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import logo from "../../../public/images/Friends Academy.png"

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={logo} alt={LogoDark} height="100px" width="200px" objectFit="cover"/>
    </Link>
  );
};

export default LogoIcon;
