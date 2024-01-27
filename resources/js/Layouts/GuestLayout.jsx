

import NavBar from '@/Components/Main/NavBar';
import Footer from '@/Components/Main/Foot';
import Vision from '@/Components/Main/Vision';
import TopButton from '@/Components/TopButton'; 
import { Parallax } from 'react-parallax';
export default function Guest({ children, auth }) {



    return (
        <>
        <div className="min-h-screen flex-col sm:justify-center items-center  sm:pt-0 bg-gray-100">     
            <div className="shadow-md pt-0" style={{background: 'linear-gradient(to bottom, black 30%, white 30%)'}}>
          
                <Vision  auth={auth}/>  
               <div id='mainChild'>
                {children}
               </div> 
            </div>
        </div>
        <Footer/> 
        <TopButton/>
        </>
    );
}
