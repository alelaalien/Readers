import React, { useState, useEffect} from 'react';
import Guest from '@/Layouts/GuestLayout';
import OnePoem from '@/Components/OnePoem';
import CategoryNav from '@/Components/CategoryNav'; 
import AddNew from '@/Components/AddNew'; 
import styled from 'styled-components';

export default function PoemIndex({poems, tags, auth})
 {
 
    const [poemsList, setPoemsList] = useState(poems.data); 
    const [page, setPage] = useState(2); 
    const [loading, setLoading] = useState(false);
    
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); 
    const headerOptions =  {
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN' : csrfToken 
        }
    const handleClickFromChild = (tag) => { newList(tag); }

    const newList = async (tag) =>{

        const options = {
            headers: headerOptions,
            method : 'POST',
            body: JSON.stringify({'tag' : tag}) 
        }
        const response = await fetch(`http://127.0.0.1:8000/poemsList`, options);

        const result = await response.json();
       
        setPoemsList(result.poems); 
    }

//********************************** */ carga dinamica de datos *******************

useEffect(() => {

    const handleScroll = () => { 
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        
        fetchData();  
      }
    };

    const fetchData = async () => {
    
      if (loading) return;
      setLoading(true);

      try {
        const options = {
            headers: headerOptions,
            method : 'POST',
            body: JSON.stringify({'page' : page}) 
        }
  
        if(page <= poems.last_page) {
            
            const request = await fetch(`http://127.0.0.1:8000/poemsScroll`, options); 
            const result = await request.json(); 
            setPage(page+1); 
            const poemPrevList = poemsList; 
            let newList = poemPrevList.concat(result.poems.data); 
            setPoemsList(newList);
        }
      } catch (error) {
        console.error("Error fetching data:/", error);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading]);
//******************************************************************************** */
 
    return(
        <Guest  auth={auth}> 
        <div className='container-fluid bg-white'> 
            <div className='row main-row'> 
                <MinBox>
                    <CategoryNav tags={tags}  onClickFromParent={handleClickFromChild}/> 
                    <AddNew item="poems" active = {auth.user ? true : false}></AddNew>
                </MinBox>  
            <div className='col-lg-3 d-lg-block d-md-none'> 
                <CategoryNav tags={tags}  onClickFromParent={handleClickFromChild}/> 
            </div>
                <div className='col-lg-6 col-md-12'>   
                        <div className="row p-4 pt-0 bg-white">
                        {
                            poemsList.map(element=> 
                            ( 
                            <OnePoem key={`one-poem-${element.id}`} poem={element}  onClickFromParent={handleClickFromChild}/>)
                            ) 
                        } 
                        </div> 
                </div>
                <div className='col-lg-3 col'>
                    <MaxBox>
                        <AddNew item="poems" active = {auth.user ? true : false}></AddNew>
                    </MaxBox>
                </div>
            </div>
        </div> 
        </Guest>
    );

}

const MinBox = styled.div`
display:none; 
@media(max-width: 991px){
    display: block;
    float:right;
    height: 40px;
}`
const MaxBox = styled.div`
display:none;
@media(min-width: 992px){
    display: block;
}`