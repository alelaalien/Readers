import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Vision from '@/Components/Main/Vision'; 
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavBar from '@/Components/Main/NavBar';

export default function Guest({ children, auth }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
             
                 <Vision></Vision> 

                 <NavBar>

                 {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            style={{color: 'wheat'}}
                            className="nav-link font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            My profile
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                style={{color: 'wheat'}}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                style={{color: 'wheat'}}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                 </NavBar>
                           

            <div className="w-full shadow-md pt-0" style={{background: 'linear-gradient(to bottom, black 30%, white 30%)'}}>
                {children}
            </div>
        </div>
    );
}
