import Footer from '@/Components/Main/Foot';
import Vision from '@/Components/Main/Vision';
import TopButton from '@/Components/TopButton'; 
import { useState, useEffect } from 'react';
import $ from 'jquery';


export default function Guest({ children, auth }) {
 
    const [firstMargin, setFirstMargin] = useState(0);

    useEffect(() => {
      
        
        let height = $('#vision').height() + $('nav').height(); 

        setFirstMargin(height);

       
 
    }, []);


    return (
        <>
        <div className="min-h-screen flex-col sm:justify-center items-center  sm:pt-0 bg-gray-100">     
            <div className="shadow-md pt-0" style={{background: 'linear-gradient(to bottom, black 30%, white 30%)'}}>
          
                <Vision  auth={auth}/>  
               <div id='mainChild' style={{marginTop: firstMargin, transition: 'margin-top 0.3s ease'}}>
                {children}
               </div> 
            </div>
        </div>
        <Footer/> 
        <TopButton/>
        </>
    );
}
