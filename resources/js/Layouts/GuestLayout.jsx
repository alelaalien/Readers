import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Vision from '@/Components/Main/Vision'; 
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavBar from '@/Components/Main/NavBar';
import Footer from '@/Components/Main/Foot';

export default function Guest({ children, auth }) {
    return (
        <>
        <div className="min-h-screen flex flex-col sm:justify-center items-center  sm:pt-0 bg-gray-100">
             
                 <Vision/> 
                 <NavBar auth={auth}/>        
            <div className="w-full shadow-md pt-0" style={{background: 'linear-gradient(to bottom, black 30%, white 30%)'}}>
                {children}
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}
