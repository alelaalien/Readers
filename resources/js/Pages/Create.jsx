import Guest from "@/Layouts/GuestLayout";
import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Create({tags, item, auth})
{
    
    const [show, setShow] = useState(false);
    const [tagList, setTagList] = useState(tags);
    const [selectedList, setSelectedTagList] = useState([]);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    // console.log(token);
    const isRelate =  item === 'App\\Models\\Relate' ? true: false ; 
    
    let itemClass = item.split('\\');

    const iClass = itemClass[2];
    
    const allTags = tags; 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const filterTags = (e ) =>{
         
        let txt = e.target.value;  

        const list = allTags.filter((tag) => 

        tag.tag.toLowerCase().includes(txt.toLowerCase()))
       
        setTagList(list);
        
      }

      const tagReturned = (param) =>{

        const txt = param.target.innerText;

        let id = parseInt(param.target.getAttribute('itemId'));
        
        let obj = {'id' : id, 'tag' : txt};

        return obj;
      }

      const findAndSplice = (obj, list) =>{

        let index = list.findIndex(tag =>   parseInt(tag.id ) ===  parseInt(obj.id) );
 
        if(index !== -1) list.splice(index, 1);

        return list;

      }

      const tagSelected = (e) =>{
  
          $('#tag-filter').val('');
  
        let obj = tagReturned(e);

        if(selectedList.length < 5){
 
            const updatedSelectedList = [...selectedList]; 

            updatedSelectedList.push(obj);

            setSelectedTagList(updatedSelectedList);
            
            findAndSplice(obj, allTags);
            
            const list = findAndSplice(obj, tagList);   
          
                      
        } setTagList(allTags);  
      }

    const tagDeselected = (e) =>{
        
        $('#tag-filter').val('');
        
        if(selectedList.length === 0) return;

        let obj = tagReturned(e); 
   
        const updatedSelectedList =  [...selectedList];

        const newList = findAndSplice(obj, updatedSelectedList);
  
        setSelectedTagList(newList);

        const updatedTagList =  [...tagList];

        updatedTagList.push(obj);

        setTagList(updatedTagList);

        allTags.push(obj); 

    }

    // **********************************

//     const formItem =  () =>{
 
//         const formData = new FormData();

//         const file = document.querySelector('input[type="file"]');
        
//         if(file.files.length > 0) {

//             formData.append('file', file.files[0]);
//         }

//         formData.append('title', $('#title').val());

//         formData.append('content', $('#content').val());

//        if($('#description'))

//         formData.append('description', $('#title').val());
 

//         const tagIds = selectedList.map((el) => {  return el.id })
         
//          formData.append('tags', tagIds); 

//          const cb = document.querySelector('input[name="privacyContent"]').value;

//          formData.append('privacy', cb);

//         saveItem(formData);

//     }

//     const saveItem = async (data) => {

//         const url = `http://127.0.0.1/${iClass}s`;
//         const options = { 
//             method : 'POST',
//             headers : {'Content-Type' : 'application/json', 'X-CSRF-TOKEN' : token},
//             body:JSON.stringify(data)
//         }
// // console.log(options)
//         const response = await fetch(url, options);

//         // const result = await response.json();

//         // console.log(result);


//     }
 

    return(

    <Guest auth={auth}>
        <form encType="multipart/form-data" method="POST" action={route('poems.store')}>
        <div className="bg-white">
            <div className="container">
                <div className="row pt-5">
                
                    <div className="col-7">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title"/>
                        </div>
                        {isRelate && ( 

                            <div className="mb-3">
                            <label htmlFor="content" className="form-label">Description</label>
                            <textarea rows="5" className="form-control" id="description" name="description"></textarea>
                            </div>

                        )} 
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea rows="24" className="form-control" id="content" name="content"></textarea>
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="mb-3 p-1">
                            <h5 className="bg-red-700 text-white text-center uppercase"> Important</h5> 
                            <p className="text-justify mb-0"> 
                            
                            Please bear in mind that content promoting violence or compromising the moral integrity of others will not be retained. Considering that the platform caters to an audience of all ages, discretion is requested when addressing topics unsuitable for minors. Your contributions are invaluable in fostering a dignified and safe environment for everyone.</p>
                        </div>
                        <div className="mb-3">
                        <Button variant="primary" onClick={handleShow} className="w-full">
                            Tag list selecting
                        </Button>
                        <p className="text-muted text-sm text-justify">By selecting tags, you can facilitate the discovery of your content by other users. These tags are editable at any time.</p>
                        </div>
                    
                    
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label font-bold">Select Image</label>
                            <hr className="mt-0"/>
                            <input type="file"  accept="image/*" className="form-control" id="image" name="image"/>
                            <p className="text-muted text-sm  text-justify">*If you choose not to upload an image, a default image will be displayed. You can add your own later.</p>
                        </div>
                    
                    
                        <div className="mb-3">
                            <label className="form-label font-bold">Privacy</label><br/>
                            <hr className="mt-0"/>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="privacyContent" id="private" defaultChecked value="0"/>
                                <label className="form-check-label" htmlFor="private">Private</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="privacyContent" id="public" value="1" />
                                <label className="form-check-label" htmlFor="public">Public</label>
                            </div> 
                            <p className="text-muted text-sm  text-justify">Save your content as a draft by selecting private; others won't be able to view it until you mark it as public.</p>
                        </div>  
                    </div>
                    <div className="col-12 text-center pb-3">
                        <button type="reset" style={{width:'100px'}} className="btn btn-danger mr-3">Reset</button> 
                        <button type="submit" style={{width:'100px'}} className="btn btn-success ml-3" 
                        // onClick={formItem}
                        >Save</button> 
                    </div>
                </div>
            </div>
        </div>  
        </form>
   
            <Modal id="tag-modal" show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                <Modal.Title className="text-center w-full uppercase">Tags selecting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <input type="search" 
                            id="tag-filter"
                            className="form-control m-auto" 
                            style={{width: '90%'}}
                            onKeyUp={filterTags}  
                            placeholder="Filter tags..."/>
                    
                    <div className="row" style={{paddingTop: '3%'}}> 
                        <div className=" col-6">
                            
                            <ul className="ul-tags overflow-y-scroll" style={{maxHeight: '338px'}}> 

                                {
                                    tagList &&(
                                    tagList.map(tag =>(

                                        <li itemID={tag.id} onClick={tagSelected}  
                                            className="cursor-pointer tags-selector text-center ml-4"
                                            key={`tag-li-${tag.id}${Math.random()}`}> 
                                            
                                            {tag.tag}
                                        </li>)
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-6">
                            
                            <ul>
                                {
                                    selectedList.map(selected =>(
                                        <li itemID={selected.id}  onClick={tagDeselected}  
                                            className="cursor-pointer tags-selector selected"
                                            key={`tag-li-${selected.id}${Math.random()}`}>
                                            <FontAwesomeIcon icon={faTag} style={{color: '#755c2d'}}></FontAwesomeIcon> 
                                            {selected.tag}
                                        </li>
                                    ))
                                }
                            </ul>
                            <p className="text-muted text-justify text-sm absolute bottom-0" style={{width: '162px'}}>
                                For better organization, choose a maximum of 5 tags</p>
                        </div>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="block text-center w-full"> 
                        <Button variant="secondary" className="mr-1" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary"  className="ml-1"  onClick={handleClose}>
                            Save Changes
                        </Button>
                    </div> 
                </Modal.Footer>
            </Modal>
    </Guest>

    );
}