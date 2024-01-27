import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import $ from 'jquery';
const Vision = ({auth}) => {
  const [scrollHeight, setScrollHeight] = useState(256);

  useEffect(() => {
    const handleScroll = () => {
            const scrollPos = window.scrollY;
            const newHeight = Math.max(100, 256 - scrollPos);
            $('#mainChild').css('margin-top' , newHeight + $('nav').height())
            setScrollHeight(newHeight); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (  
    <>
    <div id="vision" className="overflow-hidden w-full text-center flex" style={{ height: `${scrollHeight}px`, color: 'wheat', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgb(136, 70, 70)' , transition: 'height 0.3s ease'}}>
      <div className="container text-center self-center"> 
        <h1 className="txt--maxlight">c:</h1>      
        <p className="txt--maxlight">Mission, Vision & Values</p>
      </div> 
    </div>
    <NavBar auth={auth} margin={scrollHeight}/>
    </>  
  );
}

export default Vision;
