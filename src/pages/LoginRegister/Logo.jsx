import logo from "../../assets/logo.png"  
  function Logo() {
    return (
            <div className='d-flex justify-content-center flex-row pt-5 pe-5 me-5'>
              <img src={logo} alt="Huister Logo"/>
            </div>
    );
  }
  
  export default Logo;