import { MDBBtn, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PropertyServices from "../../services/PropertyServices";
import Modal from "../../components/Modal";
import CreateUpdateProperty from "./CreateUpdateProperty";
import PropertyCard from "../../components/PropertyCard";


export default function Properties(){
    const jsonUser=sessionStorage.getItem("user")
    const user=JSON.parse(jsonUser)

    const [properties,setProperties]=useState([])

    const [property,setProperty]=useState(null)

    const [modalMode,setModalMode]=useState("detail")


    useEffect(()=>{
        PropertyServices.getAllProperties(user.id)
        .then(data=>setProperties(data))
    },[])

    const [modal,setModal]=useState(false);
    const [modalTitle,setModalTitle]=useState("Property Details")
    const toggleModal=()=>{
        setModal(!modal);
    }
    const openModal=(selectedProperty,mode)=>{
        setProperty(selectedProperty)
        setModalMode(mode)
        switch (mode) {
            case "detail":
                setModalTitle("Property Details")
                break;
            case "create":
                setModalTitle("Create Property")
                break;
            case "edit":
                setModalTitle("Edit Property")
                break;
            default:
                break;
        }
        toggleModal()
    }
    
    const propertyCards=properties.map(property=><PropertyCard key={property.id} property={property} openModal={openModal} role={user.rol}/>)
    return(
        <>
            <MDBContainer fluid className="px-5 mx-5">
                <h1>Properties</h1>
                <MDBCol className=" my-3">
                    {(user.role=="OWNER")?<MDBBtn className="mx-2 py-3 mb-3"color="primary"><FaPlus size={18}/></MDBBtn>:<></>}
                </MDBCol>
                <MDBCol>
                    {propertyCards}
                </MDBCol>
            </MDBContainer>
            <Modal scrollable title={modalTitle} body={<CreateUpdateProperty mode={modalMode} property={property}/>} modal={modal} toggleModal={toggleModal} button1={(modalMode=="detail")?'CLOSE':'CANCEL'} button2={(modalMode!="detail")?'SAVE':''}/>
        </>
    )
}