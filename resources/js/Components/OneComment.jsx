import { useState } from "react";
 
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dropdown } from 'react-bootstrap'; 
import {Collapse} from 'react-collapse';
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";




dayjs.extend(relativeTime);
const CustomButton = ({ children, onClick, style }) => (
    <button onClick={onClick} className='btn-drop'>
      {children}
    </button>
  );
export default function OneComment({comment, auth})
{
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditing, setIdEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
  
    const handleDelete = () => {
      // Lógica para eliminar
    };
  
    const handleReport = () => {
      
    };
   
    const sendCommentEditted = () => {

        setIdEditing(false);
    }

    const discardCommentEditting = () => {

        setIdEditing(false);
    }
 
    
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
                                            <Dropdown.Item onClick={handleDelete}>
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
                                    <textarea defaultValue={comment.content } className="form-control"/>
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
                    <span className="text-muted text-xs">{dayjs(comment.created_at).fromNow()}</span>  
                </div> 
                <div>
                            
                            <div className="d-flex">
                                <span className="reply-comment-button cursor-pointer collapser collapser " data-id=" " data-toggle="collapse" data-target="#comment-tails-{{$comment.id}}" aria-expanded="false" aria-controls="comment-tails-comment-id"></span>
                                    {/* @if($comment.replies_count) */}
                                <span className="text-muted text-xs" > </span>
                            {/* ({{$comment.replies_count}}) */} 
                                <div>
                                    <span onClick={handleCollapse}  
                                    className="text-muted cursor-pointer collapsercomment-id" style={{fontSize: '12px'}}  data-id="comment-id" data-toggle="collapse" data-target={`#comment-tails-${comment.id}`} aria-expanded="false" aria-controls="comment-tails-comment-id">reply</span>

                                </div> 
                            </div> 
                            {/* @else
                                @if($comment.replies_count) */} 
                        </div>
                    </div> 
            </div>
        </div>
        <>
        <Collapse isOpened={isOpen} style= {{marginTop:'10px'}} id={`comment-tails-${comment.id}`} >
            <ReplyForm auth={auth} commentId={comment.id}  key={`reply-form${comment.id}`}></ReplyForm>
            <ReplyList commentId={comment.id}  key={`reply-list${comment.id}`}></ReplyList> 
        </Collapse>
        </>
    </>
    )
}

