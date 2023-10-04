import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Dashboard from './Dashboard';
import Properties from './Properties';
import Owners from './Owners';

export default function UserTemplate(props){
    const [currentPage,setCurrentPage]=useState('Dashboard');
    const switchPage=(page)=>{
        setCurrentPage(page)
    }
    let pageObject=<Dashboard />
    useEffect(()=>{
        switch (currentPage) {
            case 'Dashboard':
                <Dashboard/>
                break;
            case 'Properties':
                <Properties/>
                break;
            case 'Owners':
                <Owners/>
                break;
            default:
                break;
        }
    })
    return(
        <>
            <Navbar userRole={props.userRole} switchPage={switchPage}/>
            <main className="d-flex justify-content-center mt-5">
                
            </main>
        </>
    )
}