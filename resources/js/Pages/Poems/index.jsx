import React, { useState } from 'react';
import Guest from '@/Layouts/GuestLayout';
import OnePoem from '@/Components/OnePoem';
import CategoryNav from '@/Components/CategoryNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


export default function PoemIndex({poems, tags, auth})
{   
  
    const [poemsList, setPoemsList] = useState(poems);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); 

  
    const handleClickFromChild = (tag) => {
      
        console.log('Información recibida del hijo:', tag); 
        newList(tag); 
    }

    const newList = async (tag) =>{

        const options = {
            headers:{
                'Content-Type' : 'application/json',
                'X-CSRF-TOKEN' : csrfToken 
            },
            method : 'POST',
            body: JSON.stringify({'tag' : tag}) 
        }
        const response = await fetch(`http://127.0.0.1:8000/poemsList`, options);

        const result = await response.json();
       
        setPoemsList(result.poems); 
    }
    
    return(
        <Guest  auth={auth}> 
        <div className='container-fluid bg-white'>
             
            <div className='row main-row'>

            <div className='col-lg-3 col-sm-12'>
              
                    <CategoryNav tags={tags}  onClickFromParent={handleClickFromChild}/> 
            </div>
                <div className='col-lg-6 col-sm-12'>
                  
                    <div className="row p-4 bg-white">
                    {
                        poemsList.map(element=> 
                           ( 
                           <OnePoem key={`one-poem-${element.id}`} poem={element}  onClickFromParent={handleClickFromChild}/>)
                           ) 
                    } 
                    </div> 
                </div>
                <div className='col-lg-3'> 
                <div>soy un div</div>
                </div>
            </div>
        </div> 
        </Guest>
    );

}


