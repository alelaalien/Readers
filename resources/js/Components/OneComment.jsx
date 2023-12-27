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
    const regex = /^[a-zA-Z0-9\s\u00C0-\u017F.,:!?¿¡]+$/;
    
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
                errorSwal();
            }
        } catch (error) {
            errorSwal();
        } 
    }  
 
//--------------------------------report
const showSwalReport = (e) => {
 
    withReactContent(Swal).fire({
        title: "Report Content",
        text: "Kindly specify the grounds for your report and an administrator of the site will duly review them.",
        showCancelButton: true,
        input: "textarea",
        stopKeydownPropagation: false,
        inputAttributes: {
            autocapitalize: "off",
            className: 'form-control',
            id : `txtReportComment-${comment.id}`,
            maxlength : 255
        },
        didOpen: () => {
            const textarea = document.querySelector(`textarea[id="txtReportComment-${comment.id}"]`);
            let count = document.createElement('p');
            count.style.textAlign = 'center';
            count.textContent = '0/255' ; 
            textarea.insertAdjacentElement('afterend', count);
            textarea.onkeyup = (event) =>{
                let len =  event.target.value.length
                count.textContent = len + '/255';  
            }
            textarea.focus(); 
          },
        confirmButtonColor: "rgb(251, 125, 34)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send report",
        preConfirm: () => {

            let txtCommentReport =  document.querySelector(`textarea[id="txtReportComment-${comment.id}"]`);
            
            let report = txtCommentReport.value;  
    
            if(report.trim().length != 0){
                
                if (!regex.test(report)) {
                      
                    Swal.showValidationMessage('The string contains unauthorized characters');  
                }

            }else{ 
                Swal.showValidationMessage('First input missing'); 
            } 
 
          }, 
      }).then((result) => {

        if (result.isConfirmed) {

            handleReport(result.value);
        }
    })
  }

    const handleReport = async (report) => {

     let classType =   "App\\Models\\Comment"  ;

      console.log(classType);
        try {
            
        const response = await fetch('http://127.0.0.1:8000/addReport',{
                headers : {
                    'Content-Type' : 'application/json',
                    'X-CSRF-TOKEN' : csrfToken
                },
                method : 'POST',
                body : JSON.stringify({
                    reason : report,
                    item : classType,
                    itemId : comment.id
                })
            });

        const result = await response.json();

            console.log(result);
        result == 'ok' ? successSwal() : errorSwal();

        } catch (error) {
           
            errorSwal();
        } 
    };

    const successSwal = () =>{

        Swal.fire({
                position: "center",
                icon: "success",
                title: "Done",
                showConfirmButton: false,
                timer: 1500
              });
    }
    const errorSwal = () =>{

        Swal.fire({
                position: "center",
                icon: "error",
                title: "Error. Try again later",
                showConfirmButton: false,
                timer: 1800
              });
    }
    //--------------------------end report
   
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

            // const result = await response.json();
 

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
                successSwal();
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
                                        <Dropdown.Item onClick={showSwalReport}>
                                            <h4 className="m-auto text-base">Report</h4> 
                                            <img src="../img/assets/craneo.png" alt="Report icon" />
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
