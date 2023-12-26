import { useState } from "react";
 
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dropdown } from 'react-bootstrap'; 
import {Collapse} from 'react-collapse'; 
import ReplyList from "./ReplyList";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

dayjs.extend(relativeTime);
 
export default function OneComment({comment, auth})
{
 
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditing, setIdEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); 
    
    const handleCollapse=() =>{
       setIsOpen(!isOpen);
    } 
    
 
    const handleEditOptions = () => {
      setShowDropdown(!showDropdown);
    };
  
    const handleEdit = () => {
        
        setIdEditing(!isEditing);
        
    };

    const handleEditFalse = () => {
        
        setIdEditing(false);
    };
      
    const handleDelete = async () => {
 
       try {
    const response = await fetch(`http://127.0.0.1:8000/deleteComment/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json','X-CSRF-TOKEN':csrfToken
       
      }
    });

            if (response.ok) { 
            
            if (response.status == 200){
                setDeleted(true);
            }
            } else {
                console.error('Error');
            }
        } catch (error) {
        
        }
     
    }
  
    const handleReport = () => {
      
    };
   
    const sendCommentEditted = async () => {

        setIdEditing(false); 

        let newContent = document.getElementById(`content${comment.id}`).value; 
        let option = { 

            method : 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN' : csrfToken
            },
            body : JSON.stringify({'content': newContent})
        
        }
        
        try {

            const response = await fetch(`http://127.0.0.1:8000/updateComment/${comment.id}`, option);

            const result = await response.json();

        console.log(result);

        } catch (error) {
            
            console.error(error);
        }
  

    }

    const discardCommentEditting = () => {

        setIdEditing(false);
    } 

 
    
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

            handleDelete();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Done",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  }


    if(deleted) { return null;}
    
    return (
    <>
        <div className="flex">
            {/* col-1 */}
            <div className="user-thumbnail thumbnail d-flex cursor-pointer"> 
                <a href="/profiles" className="link-style-none  m-a">
                    <img src={`../img/users/${comment.user.user_pic}`}
                    className="user-image" alt="User thumbnail" style={{width:'50px'}}/>
                </a>  
            </div> 
            <div className="w-full pl-5 m-1">  
            <div className="row row-comm--r"> 
            {/* col-2 */}
                    <div className="card-items"> 
                        <div>
                            <div className="capitalize"> {comment.user.name } </div>
                            {/*----------------- boton de edicion---------------  */}
                            {auth.user != null && auth.user.id && (
                                <>
                                <Dropdown show={showDropdown} onClick={handleEditOptions}>
                                    <Dropdown.Toggle className="btn-drop" id="dropdown-basic">
                                        <img src="/img/assets/points.png" alt="Points" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                {auth.user.id === comment.user_id ? (
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
                                    <textarea defaultValue={comment.content } className="form-control" id={`content${comment.id}`}/>
                                    <div className="text-right">
                                        <button className="btn m-1 btn--save" onClick={sendCommentEditted}> Save changes </button>
                                        <button className="btn m-1 btn--discard" onClick={discardCommentEditting}> Discard</button> 
                                    </div>
                                </>
                            ) : 
                                (<p className="mb-1 capitalize">  {comment.content }  </p>)
                            }
                        
                        </div>
                    {/* col-3 */}
                         
                    </div>  
                </div>
                <div className="flex">
                <div className="w-full m-1" style={{marginLeft: '4%'}}>
                    <span className="text-muted text-xs">
                        {dayjs(comment.created_at).fromNow()}
                        &nbsp;
                        {comment.replies.length !== 0 ? ( ' -  ' ):''}</span>  
                            
                    <span className="replies-count cursor-pointer text-xs cursor-pointer collapsercomment-id"
                    onClick={handleCollapse}  
                    style={{fontSize: '12px'}}  
                    data-toggle="collapse" 
                    data-target={`#comment-tails-${comment.id}`} 
                    aria-expanded="false" 
                    aria-controls="comment-tails-comment-id"> 
                        {
                            comment.replies.length === 1 ? '1 reply' : comment.replies.length !== 0 ? comment.replies.length + ' replies' : ''
                        }
                    </span>
                </div>
                <div>
                            
                            <div className="d-flex">
                                <span className="reply-comment-button cursor-pointer collapser collapser " data-toggle="collapse" data-target="#comment-tails-{{$comment.id}}" aria-expanded="false" aria-controls="comment-tails-comment-id"></span>
                                
                                <div>
                                    <span onClick={handleCollapse}  
                                    className="replies-count cursor-pointer collapsercomment-id" 
                                    style={{fontSize: '12px'}}  
                                    data-id="comment-id" 
                                    data-toggle="collapse" 
                                    data-target={`#comment-tails-${comment.id}`} 
                                    aria-expanded="false" 
                                    aria-controls="comment-tails-comment-id">reply</span>

                                </div> 
                            </div> 
                        </div>
                    </div> 
            </div>
        </div>
        <>
        <Collapse isOpened={isOpen} style= {{marginTop:'10px'}} id={`comment-tails-${comment.id}`} >
            <ReplyList replies={comment.replies} commentId={comment.id} auth={auth}  key={`reply-list${comment.id}`}></ReplyList> 
        </Collapse>
        </>

    </>
    )
}
