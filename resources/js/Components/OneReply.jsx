import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dropdown } from 'react-bootstrap'; 
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

dayjs.extend(relativeTime);

export default function OneReply({reply, auth})
{
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditing, setIdEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [deleted, setDeleted] = useState(false);

    const handleCollapse=() =>{
       setIsOpen(!isOpen);
    }  
    const handleEditOptions = () => {
      setShowDropdown(!showDropdown);
    }; 
  
    const handleReport = () => {
      
    }; 

    const errorSwall = () => {

        Swal.fire({
            position: "center",
            icon: "error",
            title: "There was an error. Try again later",
            showConfirmButton: false,
            timer: 1500
          });
    }

    const confirmationSwall = () =>{

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Done",
            showConfirmButton: false,
            timer: 1500
          });
    }
    //-----------------------edit ---------------------------------------
    const discardreplyEditting = () => {

        setIdEditing(false);
    }
    const sendReplyEdited = async () => {
        
        setIdEditing(false);

        let newContent = document.getElementById(`newContent${reply.id}`).value;
 

        let option = { 

            method : 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN' : token
            },
            body : JSON.stringify({'content': newContent})
        
        }
        
        try {

            const response = await fetch(`http://127.0.0.1:8000/updateReply/${reply.id}`, option);

            const result = await response.json();

        console.log(result);

        } catch (error) {
            
            console.error(error);
        }
  

    }

    const handleEditFalse = () => {
        
        setIdEditing(false);
    };
      const handleEdit = () => {
        
        setIdEditing(!isEditing);
    };
    //--------------------delete-----------------------------------

    const handleDelete = async () => {
      
        try {

            let options = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
                          'X-CSRF-TOKEN' : token}
            };

            const data = await fetch(`http://127.0.0.1:8000/deleteReply/${reply.id}`, options);
            
            return data;

        } catch (error) {
            
            console.error(error);

            return false;
        }
    };


    
    const showSwal = () => {
        withReactContent(Swal).fire({
            title: "Are you sure?",
            text: "You won't be able to revert this",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
    
                let result = handleDelete();

                if(result){ 

                  setDeleted(true);
                  
                  confirmationSwall();

                }else{

                errorSwall();

            }
        } 
      });
    }
    
    if(deleted){ return null; }
    return (
    <>
        <div className="flex">
            {/* col-1 */}
            <div className="user-thumbnail thumbnail d-flex cursor-pointer"> 
                <a href="/profiles" className="link-style-none  m-a">
                    <img src={`../img/users/${reply.user.user_pic}`}
                    className="user-image" alt="User thumbnail" style={{width:'50px'}}/>
                </a>  
            </div> 
            <div className="w-full pl-5 m-1">  
            <div className="row row-comm--r"> 
            {/* col-2 */}
                    <div className="card-items"> 
                        <div>
                            <div className="capitalize"> {reply.user.name } </div>
                            {/*----------------- boton de edicion---------------  */}
                            {auth.user != null && auth.user.id && (
                                <>
                                <Dropdown show={showDropdown} onClick={handleEditOptions}>
                                    <Dropdown.Toggle className="btn-drop" id="dropdown-basic">
                                        <img src="/img/assets/points.png" alt="Points" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                {auth.user.id === reply.user_id ? (
                                        <>
                                            <Dropdown.Item onClick={handleEdit}>
                                                <h4 className="m-auto text-base">Edit</h4> 
                                                <img src="../img/assets/edit.png" alt="Edit" />
                                             
                                                
                                            </Dropdown.Item>   <hr  className="m-0"/>
                                            <Dropdown.Item onClick={showSwal}>
                                            <h4 className="m-auto text-base">Delete</h4> 
                                            <img src="../img/assets/eliminar.png" alt="Edit" /> 
                                               
                                            </Dropdown.Item> <hr  className="m-0"/>
                                            <Dropdown.Item onClick={handleEditFalse}>
                                            <h4 className="m-auto text-base">Cancel</h4> 
                                                <img src="../img/assets/menos.png" alt="Edit" />
                                            </Dropdown.Item>
                                        </>
                                ) : (
                                        <Dropdown.Item onClick={handleReport}>
                                            <h4 className="m-auto text-base">Report</h4> 
                                            <img src="../img/assets/creaneo.png" alt="Edit" />
                                        </Dropdown.Item>
                                )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                </>
                            )}
                        
                              
                        </div>
                        <div id="editor">
                        {/* ------------------contenido------------------------ */}
                            {isEditing   ? (
                                <>
                                    <textarea id={`newContent${reply.id}`} defaultValue={reply.content } className="form-control"/>
                                    <div className="text-right">
                                        <button className="btn m-1 btn--save" onClick={sendReplyEdited}> Save changes </button>
                                        <button className="btn m-1 btn--discard" onClick={discardreplyEditting}> Discard</button> 
                                    </div>
                                </>
                            ) : 
                                (<p className="mb-1 capitalize">  {reply.content }  </p>)
                            }
                        
                        </div>
                    {/* col-3 */}
                         
                    </div>  
                </div>
                <div className="flex">
                <div className="w-full m-1" style={{marginLeft: '4%'}}>
                    <span className="text-muted text-xs">{dayjs(reply.created_at).fromNow()}</span>  
                </div> 
                <div>
                            
                            <div className="d-flex">
                                <span className="reply-reply-button cursor-pointer collapser collapser " data-id=" " data-toggle="collapse" data-target="#reply-tails-{{$reply.id}}" aria-expanded="false" aria-controls="reply-tails-reply-id"></span>
                                    {/* @if($reply.replies_count) */}
                                <span className="text-muted text-xs" > </span>
                            {/* ({{$reply.replies_count}}) */} 
                                <div>
                                    <span onClick={handleCollapse}  
                                    className="text-muted cursor-pointer collapserreply-id" style={{fontSize: '12px'}}  data-id="reply-id" data-toggle="collapse" data-target={`#reply-tails-${reply.id}`} aria-expanded="false" aria-controls="reply-tails-reply-id">reply</span>

                                </div> 
                            </div> 
                            {/* @else
                                @if($reply.replies_count) */} 
                        </div>
                    </div> 
            </div>
        </div>
    </>
    )
}

