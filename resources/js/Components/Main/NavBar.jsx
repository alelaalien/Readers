import React, { useState, useEffect }   from 'react'
import styled from 'styled-components'
import BurguerButton from '../BurguerButton'
import { Dropdown } from 'react-bootstrap'; 
import Login from '../Login';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import Register from '../Register';

function Navbar({auth, margin}) {

  const [clicked, setClicked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginBox, setLoginBox] = useState(false);
  const [registerBox, setRegisterBox] = useState(false); 
  const { post } = useForm({ });
 
  const handleRegisterBox = () =>{
    setRegisterBox(!registerBox);
  }

  const cancelRegister = () =>{
    setRegisterBox(false);
  }
  const handleLoginBox = () =>{

    setLoginBox(!loginBox);
  }
  const cancelLogin = () =>{

    setLoginBox(false);
  }

  const handleOptions = () => {
    setShowDropdown(!showDropdown);
  };
  const handleClick = () => {
    
    setClicked(!clicked)
  }
  
  const submit = (e) => {
    e.preventDefault();

    post(route('logout'));
};
  
const redirect = (url) =>{

  window.location.href = url;

}

  return (
    <> 
      <NavContainer style={{top: margin, zIndex : '500', transition: 'top 0.3s ease'}} className='fixed' >
        
        <a  className='self-center float-left'// onClick={handleClick}
           href='/'
        > 
          <FontAwesomeIcon icon={faHome}/>
        </a>
        <div className='items-center mini-search w-full' > 
            <form action="" className='float-left self-center mr-4 m-auto w-full' style={{display:'flex'}}>
              <input  type="search"  placeholder="Search" className="form-control input-search" aria-label="Search" style={{display: 'inline'}}/>
              <button className='btn-search'>
                <FontAwesomeIcon icon={faSearch} /> 
                </button> 
            </form>
          </div> 

        <div className={`w-full flex links ${clicked ? 'active' : ''}`}> 
         
          <a className='self-center float-left' href={route('showPoems')}>Poems</a>
          <a className='self-center float-left' href={route('showThoughts')}>Echoes</a>
          <a className='self-center float-left' href="">Books</a> 
          <div className='items-center max-search' > 
            <form action="" className='float-left self-center mr-4 m-auto w-full' style={{display:'flex'}}>
              <input  type="search"  placeholder="Search" className="form-control w-full input-search" aria-label="Search" style={{display: 'inline'}}/>
              <button className='btn-search'>
              <FontAwesomeIcon icon={faSearch} />

                </button> 
            </form>
          </div>   
          {auth.user ? (
            <>
            <MiniBar>
              {/* <a href={route('dashboard')} className="min-bar self-center float-right nav-link font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                  My profile
              </a>
              <a href={route('dashboard')} className="min-bar self-center float-right nav-link font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                  Settings
              </a> */}
              <a onClick={submit}  className="cursor-pointer min-bar self-center float-right nav-link font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                  Log out
              </a>
            </MiniBar>
            
            <ToggleDiv>
              <Dropdown show={showDropdown} onClick={handleOptions}>
                  <Dropdown.Toggle className="drop-toggle" id="dropdown-basic">
                        My Account
                  </Dropdown.Toggle>
                  <Menu>
                  <Dropdown.Menu>
                          <Dropdown.Item  >
                            {/* <div className='flex' onClick={redirect('/dashboard')}>
                              
                              <h4 className="m-auto">My Profile</h4> 
                              <img src="../img/assets/user.png" alt="user" />
                            </div> */}
                          </Dropdown.Item>   
                          <Dropdown.Item  >
                            <div className='flex'>
                              <h4 className="m-auto">Settings</h4> 
                              <img src="../img/assets/ajustes.png" alt="settings icon" /> 
                            </div>
                          </Dropdown.Item>  
                          <Dropdown.Item  onClick={submit} >
                          <form onSubmit={submit}>
                            
                              <div className='flex' >
                                <h4 className="m-auto">Log out</h4> 
                                <img src="../img/assets/salir2.png" alt="close icon" /> 
                              </div>
                            </form>
                          </Dropdown.Item>  
                  </Dropdown.Menu>
                  </Menu>
              </Dropdown>
                </ToggleDiv>
            </>
          ) : (
              <div className='flex absolute self-center' style={{right: '22px'}}> 
                  <a style={{color: 'wheat'}}  
                    onClick={handleLoginBox}
                    className="cursor-pointer self-center float-right font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                      Log in
                  </a>
                  
                  {loginBox && (
                      <LoginBox>
                        <Login handleCancel={cancelLogin}></Login>
                      </LoginBox> 

                  )  }
                    
                  <a  onClick={handleRegisterBox} style={{color: 'wheat'}} className="self-center float-right ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                      Register
                  </a>
                  {registerBox &&( 
                    <RegisterBox>
                      <Register handleCancelRegister={cancelRegister}></Register>
                    </RegisterBox>
                   ) }
              </div>
          )}
        </div>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>

        
      </NavContainer>   
    </>
  )
}

export default Navbar

const NavContainer = styled.nav`
  
  left: 0;
  width: 100%;
  h2{
    color: white;
    font-weight: 400;
    a{
      font-weight:bold;
    } 
  }
  padding: .4rem;
  background-color:   #46311f;;
  display: flex;
  align-items: center;
  width:100%;
  
  a, .div-link{
    color: wheat;
    text-decoration: none;
    margin-right: 1rem;
    font-size:1.5rem;
  }
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    background: transparent;
    a:first-child {
      
    }
    a, form{
      color: wheat;
      font-size: 2rem;
      display: block;
      
    } 
    @media(min-width: 769px){
      position: initial;
      margin: 0;
      a, form{
        font-size: 1.2rem;
        color: wheat;
        display: inline;
        
      }
     
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 43%;
    left: 0;
    right: 0;
    text-align: center;
    background: black;
    padding-bottom:80px;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
    transition: background 0.5s ease, border-radius 1s ease;
    a, form{
      font-size: 2rem;
      margin-top: 1rem;
      color: wheat;
      float:none;
    }
  }
  .burguer{
    @media(min-width: 769px){
      display: none;
    }
  }
  .burguer{
    width:25%;
  }
  .min-bar, .mini-search, .max-search{
    display:none;
  }
   
  @media (min-width: 769px) {
    .mini-search {
      display: none;
    }
  }
  
  
  @media (max-width: 768px) {
    .mini-search, .min-bar {
      display: grid;

      
    }
  }

 
  @media (min-width: 769px) {
    .max-search {
      display: grid;
      width:45%;
    }
    .min-bar{
      display:none;
    }
  }
`

const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
const ToggleDiv = styled.div`
position: absolute;
right:10px;

.drop-toggle{
  background: black;
  color: wheat;
 
  border: 1px solid black;
  border-radius: 0.65rem;
  @media(max-width: 768px){
    display:none;
  }
}
`
const MiniBar = styled.div`
a.min-bar{
  @media(min-width: 769px){
    display:none;
  }
}
`
const Menu = styled.div`
.dropdown-menu.show{
  background: #46311f;;
}
h4{
  font-size: 1.2rem;
}
a.dropdown-item{
display:flex;
color:wheat;
}
a.dropdown-item:hover{
  h4{color:black!important;}
  }
}
`
const LoginBox = styled.div` 
position: absolute; 
  width: 400px;
  padding: 2%;
  border-radius: 0.65rem;
  background: #ececec;
  border: 1px solid #8a8686;
  right: 6px;
  top: 113%;
  z-index: 100;
`
const RegisterBox  =styled.div`
position: absolute; 
  width: 400px;
  padding: 2%;
  border-radius: 0.65rem;
  background: #ececec;
  border: 1px solid #8a8686;
  right: 0;
  top: 113%;
  z-index: 100;
`