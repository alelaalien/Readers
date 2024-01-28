import OnePoem from '@/Components/OnePoem';
import OneThought from '@/Components/OneThought';
import Guest from '@/Layouts/GuestLayout';
import { Link, Head } from '@inertiajs/react';  
import { useState } from 'react'; 
 
export default function Welcome({ auth, data}) {


    const [list, setList] = useState(data);

    const handleClickFromChild = () => {}
 
    return (
        <>
        <Head title="Welcome" />   
            <Guest auth={auth}>
                <div className='container-fluid' id='main-section'>
                    <div className='row'>
                    <div className='col-lg-3 col-md-2'>
                            <h1>l</h1>
                        </div>  
                        <div className='col-lg-9 col-md-10 bg-white'>
                            <div style={{height:'300px'}}>

                            </div>
                            <div> 
                            {list.map((item, index) => (
                                <div key={index}>
                                    {item.class === "poem" && (
                                     
                                        <OnePoem key={`one-poem-${item.id}`} poem={item} onClickFromParent={handleClickFromChild} />
                                       
                                    )}

                                    {item.class === "thought" && (
                                     
                                        <OneThought  key={`one-thought-${item.id}`} thought={item} onClickFromParent={handleClickFromChild} />
                                       
                                        )}
                                </div>
                                ))} 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Guest> 
        </>
    );
}
 