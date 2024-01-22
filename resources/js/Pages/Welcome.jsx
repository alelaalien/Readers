import Guest from '@/Layouts/GuestLayout';
import { Link, Head } from '@inertiajs/react'; 
 
export default function Welcome({ auth}) {
    return (
        <>
        <Head title="Welcome" />   
            <Guest auth={auth}></Guest> 
          
        </>
    );
}
