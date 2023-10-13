import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PropertyServices from "../../services/PropertyServices";
import Modal from "../../components/Modal";
import CreateUpdateProperty from "./CreateUpdateProperty";
import PropertyCard from "../../components/PropertyCard";
import CityServices from "../../services/CityServices";
import Select from "react-select";


export default function Properties(){
    const jsonUser=sessionStorage.getItem("user")
    const user=JSON.parse(jsonUser)

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
    

    useEffect(()=>{
        PropertyServices.getAllProperties(user.id)
        .then(data=>setProperties(data))
        CityServices.getAllCities(user.id)
        .then(data=>data.cities.map(datum=>{
            return {label:datum.name,value:datum.id}
        }))
        .then(cityArr=>setCityFilterOptions(cityFilterOptions.concat(cityArr)))
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
             sortedProperty.map(property=><PropertyCard key={property.id} property={property} openModal={openModal} role={user.rol}/>)
        )
    },[properties,cityOption,sortOption,ascendingSort])

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
    
    
    return(
        <>
            <MDBContainer fluid className="px-5 mx-5">
                <h1>Properties</h1>
                <MDBRow className=" my-3">
                    <MDBRow>
                        <MDBCol>
                            <Select options={cityFilterOptions} defaultValue={cityFilterOptions[0]} onChange={setCityOption}/>
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-end">
                            <Select options={sortOptions} defaultValue={sortOptions[0]} onChange={setSortOption} className="me-3"/>
                            <Select options={ascSortOptions} defaultValue={ascSortOptions[0]} onChange={setAscendingSort}/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {(user.role=="OWNER")?<MDBBtn className="mx-2 py-3 mb-3"color="primary"><FaPlus size={18}/></MDBBtn>:<></>}
                    </MDBRow>
                </MDBRow>
                <MDBRow>
                    {(propertyCards.length>0)?propertyCards:<h1>No Property Found!</h1>}
                </MDBRow>
            </MDBContainer>
            <Modal scrollable title={modalTitle} body={<CreateUpdateProperty mode={modalMode} property={property}/>} modal={modal} toggleModal={toggleModal} button1={(modalMode=="detail")?'CLOSE':'CANCEL'} button2={(modalMode!="detail")?'SAVE':''}/>
        </>
    )
}