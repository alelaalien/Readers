import React from "react";
import { useState, useEffect } from "react";
import {Collapse} from 'react-collapse'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

        const cb = document.getElementsByClassName('tags-cb');

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

     const sizeDefinition = () =>{

        const _width = window.innerWidth; 

        _width > 991 ?
        setCategoriesHidden(false):
        setCategoriesHidden(true);
     }

     useEffect(() => {

         sizeDefinition();

        const handleResize = () => {
           
            sizeDefinition();
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
                    className="close pull-right pr-2 text-sm font-bold text-gray-600"> &times; </button> 
            </div>
            {/* search */}
            <div className="bg-white select-none"> 
                <h4 onClick={handleCollapse}  
                    className="cursor-pointer uppercase text-center pt-1 text-muted text-sm"  
                    data-toggle="collapse" 
                    data-target={`#search-bar`} 
                    aria-expanded="false" 
                    aria-controls="comment-tails-comment-id">Search</h4>
                <Collapse isOpened={isOpen} style= {{marginTop:'10px'}}  id="search-bar" >
                    <div className="flex">

                        <input type="search" placeholder="Search by title..."
                            className="form-control text-xl input-search" style={{fontSize: '14px'}} aria-label="Search"
                        />
                       
                        <button className="btn-search">
                            <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>
                            </button> 
                    </div>
                </Collapse>
             </div>
             {/* tags */}
            <div className="bg-white"> 
                <h4 onClick={handleTagsCollapse}  
                    className="cursor-pointer uppercase text-center pt-1 text-muted text-sm"   
                    data-id="d-id" 
                    data-toggle="collapse" 
                    data-target={`#tags-bar`} 
                    aria-expanded="false"
                    >tags</h4>
                <Collapse isOpened={isTagsOpen} style= {{marginTop:'10px'}}  id="tags-bar" >  
                        <div className="overflow-y-scroll" style={{maxHeight: '575px'}}> 
                            {/* Lista de categorías */}
                            <ul className="m-0 p-0">
                            {
                                tags.map(element =>(
                                    <li className="px-2 py-1 text-center text-gray-500 capitalize tag-list" key={`tag-li-${element.tag_id}${Math.random()}`}
                                        onClick={checkTag}>
                                            {/* style={{borderBottom: '1px solid #ddd'}} */}
                                        <div className='m-0 p-1'> 
                                            {element.tag} <input type="checkbox" className='pull-right  tags-cb' style={{color: '#975d2a'}} value={element.tag_id} /> 
                                        </div>
                                        <hr className="p-0" style={{width: '200px', margin: '0 auto'}} />
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

  left: 0;
  width: 60%;
  }
  @media (min-width: 992px) {
  
  background:#ffffffb5; 

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