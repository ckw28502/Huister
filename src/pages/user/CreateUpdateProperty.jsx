import { MDBCarousel, MDBContainer } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PropertyServices from "../../services/PropertyServices"


export default function CreateUpdateProperty() {

    const [isCreateMode,setIsCreateMode]=useState(false)
    const [isEditMode,setIsEditMode]=useState(false)
    console.log(JSON.parse(sessionStorage.getItem('user')));
    const userId=useState("a")
    const [formData,setFormData]=useState({
        area:0,
        cityName:"",
        description:"",
        imageUrls:[],
        ownerId:userId,
        postCode:"",
        price:0,
        streetName:""
    })
    console.log(userId);

    const id=useParams().id;

    useEffect(()=>{
        if (id==undefined) {
            setIsCreateMode(true)
            setIsEditMode(false)
        }else{
            const property=PropertyServices.getProperty(id)
        }
    },[])

    return(
        <MDBContainer fluid className="d-flex flex-cloumn">
            <MDBCarousel showControls showIndicators>
                
            </MDBCarousel>
        </MDBContainer>
    )
    
}