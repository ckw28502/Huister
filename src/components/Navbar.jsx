import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBCollapse,
  MDBCol,
} from 'mdb-react-ui-kit';
import Logo from '../assets/logo.png';
import NavbarItem from './NavbarItem';
import { FaSignOutAlt } from 'react-icons/fa';
import clickable from '../pages/clickable.module.css'
import UserServices from '../services/UserServices';
import { useNavigate } from 'react-router-dom';

const Navbar=forwardRef(function Navbar(props,ref) {
  const [showBasic, setShowBasic] = useState(false);
  let items;
  let setItems;
  const user=UserServices.getUserFromToken()
  const [image,setImage]=useState(user.profilePictureUrl)
  const page=sessionStorage.getItem("page")
  if (user.role=='ADMIN') {
    [items,setItems]=useState([
        {
            name:'Dashboard',
            active:page=='Dashboard'
        },{
            name:'Properties',
            active:page=='Properties'
        },{
            name:'Owners',
            active:page=='Owners'
        }
      ])
  } else {
    [items,setItems]=useState([
        {
            name:'Dashboard',
            active:page=='Dashboard'
        },{
            name:'Properties',
            active:page=='Properties'
        }
      ])
  }

  const navigate=useNavigate()

  const LogOut=()=>{
    UserServices.Logout()
    navigate('/')
  }

  const reloadImage=()=>{
    setImage("")
  }

  useImperativeHandle(ref,()=>({reloadImage}))

  const changePage=(name)=>{
    const newItems=items
    sessionStorage.setItem("page",name )
    newItems.map((item)=>{
        item.active=name==item.name
    })
    setItems(newItems)
    setMappedItems(newItems.map((newItem)=><NavbarItem key={newItem.name} changePage={changePage} label={newItem.name} active={newItem.active}/>))
    props.switchPage(name);
  }

  useEffect(()=>{
    if (image=="" && user.role!="ADMIn") {
      setImage(user.profilePictureUrl)
    }
  },[image])
  let [mappedItems,setMappedItems]=useState(items.map((item)=>{
    return <NavbarItem key={item.name} label={item.name} changePage={changePage} active={item.active}/>
  }))
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' style={{width:'10%'}}><img className='img-fluid me-5' src={Logo} alt="Huister Logo" />

        
        </MDBNavbarBrand>
        
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBCol md="10">
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              {mappedItems}
            </MDBNavbarNav>
          </MDBCol>
          <MDBCol md="1" className='d-flex pe-3 m=lg-s-3 me-4'>
          {(user.role!="ADMIN")?<img src={image} style={{maxHeight:"50px",maxWidth:"50px", cursor:"pointer"}}name="userProfile" onClick={changePage} className='my-3 img-fluid w-50 rounded-circle'/>:<></>}
          </MDBCol>
          <MDBCol md="1" >
            <FaSignOutAlt className={clickable.clickablePointer} onClick={LogOut} size={28}/>
          </MDBCol>
        </MDBCollapse>

        
      </MDBContainer>
    </MDBNavbar>
  );
})


export default Navbar;