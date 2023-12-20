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
            <div className="user-thumbnail thumbnail d-flex cursor-pointer"> 
                <a href="/profiles" className="link-style-none  m-a">
                    <img src={`../img/users/${comment.user.user_pic}`}
                    className="user-image" alt="User thumbnail" style={{width:'50px'}}/>
                </a>  
            </div> 
                <div className="w-full row" style={{margin: '4px'}}>  
                    <div className="flex card-items"> 
                        <h5 className="capitalize"> {comment.user.name } </h5> 
                        
{/*----------------- boton de edicion---------------  */}
                    {auth.user.id && (
                        <>
                        <Dropdown show={showDropdown} onClick={handleEditOptions}>
                            <Dropdown.Toggle className="btn-drop" id="dropdown-basic">
                                <img src="/img/assets/points.png" alt="Points" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                        {auth.user.id === comment.user_id ? (
                                <>
                                    <Dropdown.Item onClick={handleEdit}>Editar</Dropdown.Item>
                                    <Dropdown.Item onClick={handleDelete}>Eliminar</Dropdown.Item>
                                </>
                        ) : (
                                   <Dropdown.Item onClick={handleReport}>Reportar</Dropdown.Item>
                        )}
                             </Dropdown.Menu>
                        </Dropdown>
                        </>
                    )}
                    </div>
                    <div id="editor-">
{/* ------------------contenido------------------------ */}
                {isEditing   ? (
                    <>
                        <textarea defaultValue={comment.content }/>
                        <div>
                            <button onClick={sendCommentEditted}> Save changes </button>
                            <button onClick={discardCommentEditting}> Discard</button>
                            <button onClick={handleEdit}> Cancel</button>
                        </div>
                    </>
                ) : 
                    (<p className="mb-1 capitalize">  {comment.content }  </p>)
                }
                    
                </div>
                <div className="d-flex  justify-content-between "> 
                    <span className="text-muted text-xs">
                        {dayjs(comment.created_at).fromNow()}  
                    </span>   
                    <div className="d-flex">
                        <span className="reply-comment-button cursor-pointer collapser collapser " data-id=" " data-toggle="collapse" data-target="#comment-tails-{{$comment.id}}" aria-expanded="false" aria-controls="comment-tails-comment-id"></span>
                            {/* @if($comment.replies_count) */}
                        <span className="text-muted text-xs" >
                        {/* ({{$comment.replies_count}}) */}
                        </span> 
                    </div> 
                        {/* @else
                            @if($comment.replies_count) */}
                    <div>
                        <span onClick={handleCollapse}  
                        className="text-muted cursor-pointer collapsercomment-id" style={{fontSize: '12px'}}  data-id="comment-id" data-toggle="collapse" data-target={`#comment-tails-${comment.id}`} aria-expanded="false" aria-controls="comment-tails-comment-id">reply</span>

                    </div>
                            {/* @endif
                        @endif */}
                </div>
                </div>   
                {/* <!-- replies -. */}
               
                    {/* <!--form  -.
                    @php($key = rand(11111,99999))
                    @livewire('reply-form', ['action' => 'sendReply', 'modelGroup' => $comment, 'modelContent' => 'content'], key($key))
                    @php($key2 = rand(11111,99999)) 
                    @livewire('reply-list', ['comment'=> $comment], key($key2) )  */}
                     
                

                   
        </div>
        <Collapse isOpened={isOpen} style= {{marginTop:'10px'}} id={`comment-tails-${comment.id}`} >
            <ReplyForm auth={auth} commentId={comment.id}  key={`reply-form${comment.id}`}></ReplyForm>
            <ReplyList commentId={comment.id}  key={`reply-list${comment.id}`}></ReplyList> 
        </Collapse>
        </>
    )
}

