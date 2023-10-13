import { useEffect, useState } from 'react'
import UserServices from '../../services/UserServices'
import { MDBListGroup,MDBInput, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import UserListItem from '../../components/UserListItem'
import Select from 'react-select'
import UserDetail from './UserDetail'
import Modal from '../../components/Modal'


export default function Owners(){
    const [ownerList,setOwnerList]=useState([])

    const [showedOwnerList,setShowedOwnerList]=useState([])

    const [search,setSearch]=useState('')
    
    const [userId,setUserId]=useState(undefined)

    const [modal,setModal]=useState(false);

    const toggleModal=(id)=>{
        setUserId(id)
        setModal(!modal);
    }
    
    const options=[
        {label:"Name",value:"name"},
        {label:"E-Mail",value:"email"},
        {label:"Property Owned",value:"propertyOwned"},
        {label:"Property Rented",value:"propertyRented"}
    ]

    const [sort,setSort]=useState(options[0])

    const ascendingSortListOptions=[
        {label:"Asc",value:true},
        {label:"Desc",value:false}
    ]

    const [ascendingSort,setAscendingSort]=useState(ascendingSortListOptions[0])

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

    const sortOwnerListByName=(list)=>{
        return list.sort((a,b)=>{
            const x=a.name.toLowerCase()
            const y=b.name.toLowerCase()
            return doSort(x,y)
        })
    }

    const sortOwnerListByEmail=(list)=>{
        return list.sort((a,b)=>{
            const x=a.email.toLowerCase()
            const y=b.email.toLowerCase()
            return doSort(x,y)
        })
    }

    const sortOwnerListByPropertyOwned=(list)=>{
        return list.sort((a,b)=>{
            const x=a.propertyOwned
            const y=b.propertyOwned
            return doSort(x,y)
        })
    }


    
    useEffect(()=>{
        UserServices.getAllOwners()
        .then(data=>data)
        .then(data=>data)
        .then(data=>setOwnerList(sortOwnerListByName(data)))
            
    },[])
    useEffect(()=>{
        let newOwnerList;
        switch (sort.value) {
            case "name":
                newOwnerList=sortOwnerListByName(ownerList)
                break;
            case "email":
                newOwnerList=sortOwnerListByEmail(ownerList)
                break;
            case "propertyOwned":
                newOwnerList=sortOwnerListByPropertyOwned(ownerList)
                break;
            default:
                break;
        }
        let filteredOwnerList;
        if (search.length>0) {
            filteredOwnerList=newOwnerList.filter(owner=>owner.name.toLowerCase().includes(search)||
            owner.email.toLowerCase().includes(search))
        }else{
            filteredOwnerList=newOwnerList
        }
        setShowedOwnerList(filteredOwnerList.map(owner=><UserListItem toggleModal={toggleModal} key={owner.id} owner={owner}/>))
        setOwnerList(newOwnerList)
    },[ownerList,search,sort,ascendingSort])
    return(
        <MDBContainer fluid className='px-5 mx-5 d-flex flex-column'>
            <h1 className='mb-4'>List Of Property Owners</h1>
            <MDBRow className='mb-5'>
                <MDBCol className='w-25 d-flex flex-row'>
                    <MDBInput label="search by name or email" onChange={e=>setSearch(e.target.value.toLowerCase())} wrapperClass='w-50' name="search"/>
                </MDBCol>
                <MDBCol className='w-25 d-flex flex-row-reverse'>
                    <Select className='mx-3' defaultValue={ascendingSort} onChange={setAscendingSort} options={ascendingSortListOptions}/>
                    <Select defaultValue={sort} onChange={setSort} options={options}/>
                </MDBCol>
            </MDBRow>
            <MDBRow className=' w-100 mx-1'>
                <MDBListGroup className='w-100 mx-3 d-flex flex-row flex-wrap' style={{ minWidth: '22rem' }} light>
                    {showedOwnerList}
                </MDBListGroup>
            </MDBRow>

            <Modal scrollable title='User Details' body={<UserDetail userId={userId}/>} modal={modal} toggleModal={toggleModal} button1='CLOSE'/>
            
        </MDBContainer>
    )
}