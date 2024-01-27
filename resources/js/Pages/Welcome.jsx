import OnePoem from '@/Components/OnePoem';
import OneThought from '@/Components/OneThought';
import Guest from '@/Layouts/GuestLayout';
import { Link, Head } from '@inertiajs/react'; 
import { useState } from 'react';
import styled from 'styled-components';
 
export default function Welcome({ auth, data}) {
    // console.log(data.data);

    // console.log(auth.user.profile_photo_path);

    // console.log(data)
    const [list, setList] = useState(data);

    const handleClickFromChild = () => { }
 
    return (
        <>
        <Head title="Welcome" />   
            <Guest auth={auth}>
                <div className='container-fluid' id='main-section'>
                    <div className='row'>  
                        <div className='col-lg-9 col-md-10 bg-white'>
                        {list.map((item, index) => (
                            <div key={index}>
                                {item.class === "poem" && (
                                    <OnePoem key={`one-poem-${item.id}`} poem={item} onClickFromParent={handleClickFromChild} />
                                )}

                                {item.class === "thought" && (
                                    <OneThought key={`one-thought-${item.id}`} thought={item} onClickFromParent={handleClickFromChild} />
                                )}
                            </div>
                            ))} 
                        </div>
                        <div className='col-lg-3 col-md-2' style={{background: 'lightblue'}}>
                            <h1>l</h1>
                        </div>
                    </div>
                </div>
            </Guest> 
        </>
    );
}
 