

import NavBar from '@/Components/Main/NavBar';
import Footer from '@/Components/Main/Foot';
import Vision from '@/Components/Main/Vision';
import $ from 'jquery';
import { useEffect } from 'react';

export default function Guest({ children, auth }) {

  // useEffect(() =>{

  //   $('#mainChild').css('margin-top' , $('#navContainer').position().top  );
  // }, []);

    return (
        <>
        <div className="min-h-screen flex flex-col sm:justify-center items-center  sm:pt-0 bg-gray-100">     
            <div className="w-full shadow-md pt-0" style={{background: 'linear-gradient(to bottom, black 30%, white 30%)'}}>
            <Vision/> 
               <div id='mainChild'><NavBar auth={auth}/>
                {children}
               </div> 
            </div>
        </div>
        <Footer/> 
        </>
    );
}
