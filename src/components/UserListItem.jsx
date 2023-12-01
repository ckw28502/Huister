import { MDBBadge, MDBCol, MDBListGroupItem } from "mdb-react-ui-kit";


export default function UserListItem(props){
    return(
        <MDBCol className="mx-5" xl={5} md={12}>
            <MDBListGroupItem onClick={()=>props.toggleModal(props.owner.id)}style={{cursor:"pointer"}} className='d-flex border-dark border border-5 rounded-pill bg-light justify-content-between align-items-center px-4 mx-1 mb-3 container-fluid min-w-100'>
                <div className='d-flex align-items-center'>
                <img
                    src={props.owner.profilePictureUrl}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                />
                <div className='ms-3'>
                    <p className='fw-bold mb-1 h6'>{props.owner.name}</p>
                    <p className='text-muted h6'>{props.owner.email}</p>
                </div>
                </div>
                <div className="d-flex flex-column">
                <MDBBadge pill light color='primary' className="mb-2">
                    {`Property owned : ${props.owner.propertyOwned}`}
                </MDBBadge>
                <MDBBadge pill light color='secondary'>
                    {`Property rented : ${props.owner.propertyRented}`}
                </MDBBadge>
                </div>
            </MDBListGroupItem>
        </MDBCol>
    )
}