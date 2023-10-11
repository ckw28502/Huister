import { MDBBadge, MDBListGroupItem } from "mdb-react-ui-kit";


export default function UserListItem(props){
    return(
        <MDBListGroupItem style={{width:"48%"}} className='d-flex border-dark border border-5 rounded-pill bg-light justify-content-between align-items-center px-4 mx-1 mb-3'>
            <div className='d-flex align-items-center'>
            <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
            />
            <div className='ms-3'>
                <p className='fw-bold mb-1'>{props.owner.name}</p>
                <p className='text-muted mb-0'>{props.owner.email}</p>
            </div>
            </div>
            <MDBBadge pill light color='primary'>
                {`Property owned : ${props.owner.propertyOwned}`}
            </MDBBadge>
        </MDBListGroupItem>
    )
}