import React, { useState } from 'react';
import Guest from '@/Layouts/GuestLayout';
import OnePoem from '@/Components/OnePoem';
import CategoryNav from '@/Components/CategoryNav';


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
        <div className='container-fluid' style={{background: 'white'}}>
            <div className='row main-row'>
              
                    <CategoryNav className='col-md-2' tags={tags}  onClickFromParent={handleClickFromChild}/> 
         
                <div className='col-lg-7 col-sm-12'>
                  
                    <div className="row" style={{background: 'white'}}>
                    {
                        poemsList.map(element=> 
                           ( 
                           <OnePoem key={`one-poem-${element.id}`} poem={element}  onClickFromParent={handleClickFromChild}/>)
                           ) 
                    } 
                    </div> 
                </div>
                <div className='col-lg-2'> 
                </div>
            </div>
        </div> 
        </Guest>
    );

}


