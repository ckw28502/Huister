import { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import Logo from '../assets/logo.png';
import NavbarItem from './NavbarItem';

export default function Navbar(props) {
  const [showBasic, setShowBasic] = useState(false);
  let items;
  let setItems;
  if (JSON.parse(sessionStorage.getItem("user")).role=='ADMIN') {
    [items,setItems]=useState([
        {
            name:'Dashboard',
            active:true
        },{
            name:'Properties',
            active:false
        },{
            name:'Owners',
            active:false
        }
      ])
  } else {
    [items,setItems]=useState([
        {
            name:'Dashboard',
            active:true
        },{
            name:'Properties',
            active:false
        }
      ])
  }

  const changePage=(name)=>{
    const newItems=items
    newItems.map((item)=>{
        item.active=name==item.name
    })
    setItems(newItems)
    setMappedItems(newItems.map((newItem)=><NavbarItem key={newItem.name} changePage={changePage} label={newItem.name} active={newItem.active}/>))
    props.switchPage(name);
  }
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
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {mappedItems}
          </MDBNavbarNav>
        </MDBCollapse>
        
      </MDBContainer>
    </MDBNavbar>
  );
}