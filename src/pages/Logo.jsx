import logo from "../images/logo.png"  
  function Logo() {
    return (
            <div className='d-flex flex-row ps-5 pt-5'>
              <img src={logo} alt="Huister Logo"/>
            </div>
    );
  }
  
  export default Logo;