import React from "react";
import { useState, useEffect } from "react";
import {Collapse} from 'react-collapse'; 
import styled from 'styled-components';

export default function CategoryNav({tags,  onClickFromParent})
{
    const [isOpen, setIsOpen] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(true);
    const [categoriesHidden, setCategoriesHidden] = useState(true);
    const [listHandlerVisible, setListHandlerVisible] = useState(true);
    
    const handleCollapse=() =>{
        setIsOpen(!isOpen);
     } 
     const findByTags =(e)=>{

        let cb = document.getElementsByClassName('tags-cb');

        let cbArray = Array.from(cb);
        
        let tagsArray = [];

        cbArray.forEach(checkbox => {
          
            if(checkbox.checked )

            tagsArray.push(checkbox.value);
             
          });
 
        onClickFromParent(tagsArray);   
   }
     const handleTagsCollapse=() =>{
        setIsTagsOpen(!isTagsOpen);
     } 
     
     const handleList = () =>{
        setCategoriesHidden(false);
        setListHandlerVisible(false);

     }
     const handleClose = () =>{
        setCategoriesHidden(true);
        setListHandlerVisible(true);

     }

     const checkTag = (e) =>{
        let cb = e.target.children[0];

        cb.checked = !cb.checked;
     }
     useEffect(() => {
        const handleResize = () => {
            const _width = window.innerWidth;
            _width > 991 ?
            setCategoriesHidden(false):
            setCategoriesHidden(true);
        };
    
        window.addEventListener('resize', handleResize);
    
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);  
    

    return(
        <>
        { !categoriesHidden ? (

       
        <CategoryList className="p-0 select-none">
            <div className="w-full close" style={{height:'25px'}}>
                <button type="button" onClick={handleClose}
                    className="close pull-right pr-2 text-4xl font-bold text-gray-600"> &times; </button> 
            </div>
            {/* search */}
            <div className="bg-white select-none"> 
                <h4 onClick={handleCollapse}  
                    className="cursor-pointer uppercase text-center pt-1 text-muted"  
                    data-id="d-id" 
                    data-toggle="collapse" 
                    data-target={`#search-bar`} 
                    aria-expanded="false" 
                    aria-controls="comment-tails-comment-id">Search</h4>
                <Collapse isOpened={isOpen} style= {{marginTop:'10px'}}  id="search-bar" >
                    <div className="flex">

                        <input type="search" placeholder="Search by title..."
                            className="form-control text-xl" style={{fontSize: '22px'}} aria-label="Search"
                        />
                       
                        <button><img className="scalable" src="../img/assets/lupa.png" alt="search" /></button> 
                    </div>
                </Collapse>
             </div>
             {/* tags */}
            <div className="bg-white"> 
                <h4 onClick={handleTagsCollapse}  
                    className="cursor-pointer uppercase text-center pt-1 text-muted"   
                    data-id="d-id" 
                    data-toggle="collapse" 
                    data-target={`#tags-bar`} 
                    aria-expanded="false"
                    >tags</h4>
                <Collapse isOpened={isTagsOpen} style= {{marginTop:'10px'}}  id="tags-bar" >  
                        <div className="overflow-y-scroll" style={{maxHeight: '575px'}}> 
                            {/* Lista de categorías */}
                            <ul className="m-0 p-0" style={{border: '6px double #a8a6a6'}}>
                            {
                                tags.map(element =>(
                                    <li className="px-2 py-1 text-center text-gray-500 capitalize tag-list" key={`tag-li-${element.tag_id}${Math.random()}`}
                                    style={{background: 'rgb(212,211,210)',
                                        background: 'linear-gradient(0deg, rgba(212,211,210,1) 0%, rgba(255,255,255,0.11806720979407392) 50%, rgba(212,211,210,1) 100%)'}}
                                        onClick={checkTag}
                                    >
                                        <div className=''> 
                                            {element.tag} <input type="checkbox" className='pull-right  tags-cb' style={{color: '#975d2a'}} value={element.tag_id} /> 
                                        </div>
                                        
                                    </li>
                                ))
                            } 
                            </ul>
                        </div>
                        <div className='flex mt-2'>
                            <button className='btn btn-brown m-auto' onClick={findByTags}>Apply</button>
                        </div>
                </Collapse>
            </div>
        </CategoryList> 
         ): (
            
            listHandlerVisible ?
            (<Exploration className="cat-handler" onClick={handleList}>Tag and title Exploration </Exploration> ) : ''
          
         )
                        
    }
        </>
    );
}

const CategoryList = styled.div` 

  @media (max-width: 992px) {
    position: absolute;
  background:#ffffffb5;
  height: 100vh;
  z-index: 200;
  border: 15px double #46311f21;
  left: 0;
  width: 60%;
  }
  @media (min-width: 992px) {
    width: 25%;
  background:#ffffffb5; 
  border: 15px double #46311f21;
  .close{
    display:none;
  }
  
  }
`;
const Exploration = styled.div` 

  @media (max-width: 992px) {
    position: absolute;
    background: #000000b5; 
    z-index: 200; 
    left: 0;
    width: 222px;
    height: 55px;
    color: white; 
    border-bottom-right-radius: 100%;
    cursor: pointer;
 
  }
  @media (min-width: 992px) {
    display:none; 
  }
`;