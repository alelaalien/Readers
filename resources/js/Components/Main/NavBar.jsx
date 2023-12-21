import React, { useState } from 'react'
import styled from 'styled-components'
import BurguerButton from '../BurguerButton'

function Navbar({auth}) {

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    
    setClicked(!clicked)
  }
  
  return (
    <>
      <NavContainer>
        <a  className='self-center float-left' onClick={handleClick} href="#h">
          <img src="../img/assets/home.png" alt="home" style={{width: '70px'}} />
        </a>
        <div className={`w-full flex links ${clicked ? 'active' : ''}`}>
          
          
         
          <a className='self-center float-left' href="">Poems</a>
          <a className='self-center float-left' href="">Echoes</a>
          <a className='self-center float-left' href="">Books</a>
          {auth.user ? (
              <a href={route('dashboard')} style={{color: 'wheat'}} className="self-center float-right nav-link font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                  My profile
              </a>
          ) : (
              <>
                  <a href={route('login')} style={{color: 'wheat'}}  className="self-center float-right font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                      Log in
                  </a>

                  <a  href={route('register')} style={{color: 'wheat'}} className="self-center float-right ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                      Register
                  </a>
              </>
          )}

         <div className='items-center grid'> 
            <form action="" className='float-left self-center mr-4 m-auto' style={{display:'flex'}}>
              <input  type="search"  placeholder="Search" className="form-control" aria-label="Search" style={{width: 'fit-content', display: 'inline'}}/>
              <button><img src="../img/assets/lupa.png" alt="search" /></button> 
            </form>
          </div> 
            
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
  h2{
    color: white;
    font-weight: 400;
    a{
      font-weight:bold;
    } 
  }
  padding: .4rem;
  background-color: #333;
  display: flex;
  align-items: center;
  width:100%;
  
  a{
    color: wheat;
    text-decoration: none;
    margin-right: 1rem;
    font-size:2rem;
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
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a, form{
        font-size: 1.7rem;
        color: wheat;
        display: inline;
        
      }
      display: block;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 32%;
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
    @media(min-width: 768px){
      display: none;
    }
  }
  .burguer{
    width:100%;
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