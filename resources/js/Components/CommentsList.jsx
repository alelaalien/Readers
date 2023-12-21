import { useState } from "react";
import OneComment from "./OneComment";

export default function CommentList({item, auth})
{
 
let comments = item.comments;
const element = item;

const sendComment = async (e) => {

  e.preventDefault(); 
  let content = document.getElementById('comment-content').value;
  let itemId = element.id; 
     
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
            classType: element.class,
            item : itemId }) 
      }


      fetch('http://127.0.0.1:8000/addComment', requestOptions)
          .then(response => {
             
           return response.json();
             
          }).then(response =>{

            if(response == 'ok'){ document.getElementById('comment-content').value = ''; }
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
    
    <div style={{marginTop: '4%'}}>  
      <div className="container"> 
        <div className="row">
          <div className="col-lg-12 mx-auto p-0"> 
            <div className="card">
              <div className="card-header">
                  Comments
              </div> 
              <div className="form-group" style={{ padding: '2%'}} >  
                <textarea  className="form-control" rows="3" placeholder="Write your comment here" id="comment-content"></textarea>
                {
              auth.user.id ?
              ( <> <button 
                    className="btn btn-primary comment-btn float-right w-24" 
                    onClick={sendComment} style={{marginTop: '1%'}}>Send</button></> )
              : ( <><span> You must to be registered to comment </span></> ) 
            } 
              </div> 
            
           
            <div className="card-body">  
              <ul className="list-group list-group-flush" wire:key="list-data->id" id="list-data-id"> 
                
                {
                  comments.map(element => {
                    return( 
                    <li className="list-group-item" style={{border:'none'}}> 
                    <OneComment comment={element} auth={auth} key={`one-comment${element.id}`}></OneComment>
                    </li>); 
                    }) 
                }
               
              </ul> 
            </div>   
          </div> 
        </div>
      </div>
    </div>
  </div>
  );
}