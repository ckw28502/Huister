import { MDBCarousel, MDBContainer } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"


export default function CreateUpdateProperty(props) {

    const [isCreateMode,setIsCreateMode]=useState(false)
    const [isEditMode,setIsEditMode]=useState(false)

    useEffect(()=>{
        switch (props.mode) {
            case "detail":
                setIsCreateMode(false)
                setIsEditMode(false)
                break;
            case "create":
                setIsCreateMode(true)
                setIsEditMode(false)
                break;
            case "edit":
                setIsCreateMode(false)
                setIsEditMode(true)
                break;
            default:
                break;
        }
    },[props.mode])

    return(
        <MDBContainer fluid className="d-flex flex-cloumn">
            <MDBCarousel showControls showIndicators>
                
            </MDBCarousel>
        </MDBContainer>
    )
    
}