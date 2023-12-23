import React from "react";
import { useState } from "react";
import OneReply from "./OneReply";

export default function ReplyList({commentId, auth, replies}){
  
const [replyList, setReplyList] = useState(replies); 

  let name_ = 'reply-content'+ commentId;
 
let rand = Math.random();
const sendReply = async (e) => {

  e.preventDefault(); 
  let content = document.getElementById(name_).value;

console.log(commentId);
     
  fetch('http://127.0.0.1:8000/csrf-token')
    .then(response => {
      if (!response.ok) { throw new Error('Network response was not ok');  }
      return response.json();
    })
    .then(data => {
      const csrfToken = data.csrf_token;
      const requestOptions = {
        method: 'post',
       
        credentials: 'same-origin',
        headers: {'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json'},
        body:JSON.stringify({
            content: content, 
            commentId : commentId }) 
      }


      fetch('http://127.0.0.1:8000/addReply', requestOptions)
          .then(response => {
             
           return response.json();
             
          }).then(response =>{
            
            if(response ){ 
              
                document.getElementById(name_).value = ''; 
                setReplyList(response); 
          }
          })
          .catch(error => {
              
            console.error('Error al realizar la solicitud:/', error);
          });
      })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    }); 
}; 
    
  return (
    
      <div className="container"> 
            <div className="form-group" style={{ padding: '2%'}} >  
              <textarea  className="form-control" rows="3" placeholder="Write your Reply here" id={name_}></textarea>
              {
            auth.user != null && auth.user.id ?
            ( <> <button 
                  className="btn btn-primary Reply-btn float-right w-24" 
                  onClick={sendReply} style={{marginTop: '1%'}}>Send</button></> )
            : ( <><span style={{color:'#8c8a8a'}}> You must to be registered to reply </span></> ) 
          } 
            </div>  
          <div className="card-body">  
            <ul className="list-group list-group-flush" id="list-data-id"> 
              
              {
                replyList.map((element, index )=> {
                  return( 
                  <li className="list-group-item" style={{border:'none'}} key={`${rand}-replies-${element.id}`}> 
                  <OneReply reply={element} auth={auth} key={`one-reply${element.id}-${index}`}></OneReply>
                  </li>); 
                  }) 
              }
              
            </ul> 
          </div> 
        </div>  
  );

 }