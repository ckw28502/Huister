import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaCross, FaPlus } from "react-icons/fa";
import PropertyServices from "../../services/PropertyServices";
import Modal from "../../components/Modal";
import PropertyCard from "../../components/PropertyCard";
import CityServices from "../../services/CityServices";
import Select from "react-select";
import UserServices from "../../services/UserServices";
import DeleteProperty from "./DeleteProperty";
import ToastServices from "../../services/ToastServices";
import { FaXmark } from "react-icons/fa6";
import CreateProperty from "./CreateProperty";
import FirebaseServices from "../../services/FirebaseServices";
import EditProperty from "./EditProperty";


export default function Properties(){
    const user=UserServices.getUserFromToken()

    const [properties,setProperties]=useState([])

    const [property,setProperty]=useState(null)

    const [modalMode,setModalMode]=useState("detail")

    const sortOptions=[
        {label:"Price",value:'price'},
        {label:"Area",value:"area"}
    ]

    const [sortOption,setSortOption]=useState(sortOptions[0])

    const ascSortOptions=[
        {label:"ASC",value:true},
        {label:"DESC",value:false}
    ]
    const [ascendingSort,setAscendingSort]=useState(ascSortOptions[0])


    const [cityFilterOptions,setCityFilterOptions]=useState([
        {label:"All Cities",value:'0'}
    ])

    const [cityOption,setCityOption]=useState(cityFilterOptions[0])
    

    const getProperties=()=>{
        PropertyServices.getAllProperties()
        .then(data=>setProperties(data))
        CityServices.getAllCities()
        .then(data=>data.cities.map(datum=>{
            return {label:datum.name,value:datum.id}
        }))
        .then(cityArr=>setCityFilterOptions(cityFilterOptions.concat(cityArr)))
    }

    useEffect(()=>{
        getProperties()
    },[])

    const [propertyCards,setPropertyCards]=useState([])

    const doSort=(x,y)=>{
        if (ascendingSort.value) {
            if (x<y) {
                return -1
            } else if (x>y){
                return 1
            }
            return 0
        }
        if (x<y) {
            return 1
        } else if (x>y){
            return -1
        }
        return 0
    }

    const sortPropertiesByPrice=(list)=>{
        return list.sort((a,b)=>{
            const x=a.price
            const y=b.price
            return doSort(x,y)
        })
    }

    const sortPropertiesByArea=(list)=>{
        return list.sort((a,b)=>{
            const x=a.area
            const y=b.area
            return doSort(x,y)
        })
    }

    useEffect(()=>{
        let filteredProperty
        if (cityOption.value>0) {
            filteredProperty=properties.filter(property=>property.cityId==cityOption.value)
        }else{
            filteredProperty=properties
        }
        let sortedProperty
        switch (sortOption.value) {
            case "price":
                sortedProperty=sortPropertiesByPrice(filteredProperty)
                break;
            
            case "area":
                sortedProperty=sortPropertiesByArea(filteredProperty)
                break;
                
            default:
                break;
        }
        setPropertyCards(
             sortedProperty.map(property=><PropertyCard key={property.id} property={property} openModal={toggleModal} role={user.role}/>)
        )
    },[properties,cityOption,sortOption,ascendingSort])

    const[modalBody,setModalBody]=useState(null)

    const [modal,setModal]=useState(false);
    const [propertyId,setPropertyId]=useState(null);
    const toggleModal=(id,body)=>{
        setPropertyId(id)
        switch (body) {
            case "DELETE":
                setModalBody(<DeleteProperty/>)
                childRef.current=null
                break;
            case "CREATE":
                setModalBody(<CreateProperty ref={childRef}/>)
                break
            case "EDIT":
                setModalBody(<EditProperty propertyId={id} ref={childRef}/>)
                break
            default:
                null
                break;
        }
        setModal(!modal)
    }


    const onHandleSubmit=()=>{

        //Create or Update
        if (childRef.current) {
            const formData=childRef.current.handleSubmit()
            
            if (formData.mode=="CREATE") {
                FirebaseServices.uploadImage(formData.image,"/property/"+formData.streetName+"-"+formData.houseNumber)
                .then(downloadUrl=>{
                    formData.imageUrl=downloadUrl
                    PropertyServices.createProperty(formData)
                    .then(()=>ToastServices.Success("Property Created Successfully!!!"))
                    
                })
            }else{
                if(formData.image){
                    FirebaseServices.uploadImage(formData.image,"/property/"+formData.streetName+"-"+formData.houseNumber)
                }
                PropertyServices.updateProperty(propertyId,formData)
                .then(()=>ToastServices.Success("Property Updated Successfully!"))
            }
        }else{
            //Delete
            PropertyServices.deleteProperty(propertyId)
            .then(()=>ToastServices.Success("Property Deleted Successfully!"))
            .then(()=>getProperties())
            .catch(()=>ToastServices.Error("Internal Server Error!"));
        }
        getProperties()
    }

    const childRef=useRef();


    return(
        <>
            <MDBContainer fluid className="px-5 mx-5">
                <h1>Properties</h1>
                <MDBRow className=" my-3">
                    <MDBRow className="mb-4">
                        <MDBCol>
                            <Select options={cityFilterOptions} defaultValue={cityFilterOptions[0]} onChange={setCityOption}/>
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-end">
                            <Select options={sortOptions} defaultValue={sortOptions[0]} onChange={setSortOption} className="me-3"/>
                            <Select options={ascSortOptions} defaultValue={ascSortOptions[0]} onChange={setAscendingSort}/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-5">
                        <MDBCol size='1'>
                            {(user.role=="OWNER")?<MDBBtn onClick={()=>toggleModal(0,"CREATE")}className="mx-2 py-3 mb-3"color="primary"><FaPlus size={18}/></MDBBtn>:<></>}
                        </MDBCol>
                    </MDBRow>
                </MDBRow>
                <MDBRow>
                    {(propertyCards.length>0)?propertyCards:<h2>No Property Found!</h2>}
                </MDBRow>
            </MDBContainer>
            <Modal scrollable title={"Delete Property"} accept={onHandleSubmit} body={modalBody} modal={modal} toggleModal={toggleModal} button1={<FaXmark/>} button2={<FaCheck/>}/>
        </>
    )
}