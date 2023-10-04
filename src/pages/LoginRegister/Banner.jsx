import loginBanner from '../../assets/loginbanner.jpeg'
import { MDBCol } from 'mdb-react-ui-kit';

function Banner() {
    return(
        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src={loginBanner}
            alt="Login Banner" className=" position-relative" style={{objectFit: 'cover', objectPosition: 'left',height:'150%', maxWidth:'90%'}} />
        </MDBCol>
    ) 
}
export default Banner;