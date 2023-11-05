import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminDashboard from './AdminDashboard';
import Properties from './Properties';
import Owners from './Owners';
import OwnerDashboard from "./OwnerDashBoard";
import CustomerDashboard from "./CustomerDashboard";
import UserDetails from "./UserDetail";
import UserProfile from "./UserProfile";

export default function UserTemplate(){
    const [currentPage,setCurrentPage]=useState('Dashboard');
    if (sessionStorage.getItem("user")===null) {
        window.location.href="/"
    }
    const user=useState(JSON.parse(sessionStorage.getItem('user')))[0]
    const switchPage=(page)=>{
        setCurrentPage(page)
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
                setPageObject(<UserProfile/>)
                break;
        }
    },[currentPage])    
    return(
        <>
            <Navbar switchPage={switchPage}/>
            <main className="d-flex justify-content-center mt-5">
                {pageObject}
            </main>
        </>
    )
}