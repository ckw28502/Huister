import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminDashboard from './AdminDashboard';
import Properties from './Properties';
import Owners from './Owners';
import OwnerDashboard from "./OwnerDashBoard";
import CustomerDashboard from "./CustomerDashboard";
import UserProfile from "./UserProfile";
import UserServices from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
import WebSocketService from "../../services/WebSocketService";

export default function UserTemplate(){
    const childRef=useRef()
    const [currentPage,setCurrentPage]=useState(sessionStorage.getItem("page"));
    const navigate=useNavigate()
    const user=useState(UserServices.getUserFromToken())[0]
    if (user==null) {
        navigate("/")
    }
    const switchPage=()=>{
        setCurrentPage(sessionStorage.getItem("page"))
        WebSocketService.disconnect()
    }

    const profilePictureUpload=()=>{
        childRef.current.reloadImage()
    }

    const checkUserRoleForDashboard=()=>{
        switch (user.role) {
            case 'ADMIN':
                return(<AdminDashboard/>)
            case 'OWNER':
                return(<OwnerDashboard/>)
            case 'CUSTOMER':
                return(<CustomerDashboard/>)
            default:
                break;
        }
    }
    const [pageObject,setPageObject]=useState(checkUserRoleForDashboard())
    useEffect(()=>{
        switch (currentPage) {
            case 'Dashboard':
                setPageObject(checkUserRoleForDashboard());
                break;
            case 'Properties':
                setPageObject(<Properties/>)
                break;
            case 'Owners':
                setPageObject(<Owners/>)
                break;
            default:
                setPageObject(<UserProfile profilePictureUpload={profilePictureUpload}/>)
                break;
        }
    },[currentPage])
    
    return(
        <>
            <Navbar switchPage={switchPage} ref={childRef}/>
            <main className="d-flex justify-content-center mt-5">
                {pageObject}
            </main>
        </>
    )
}