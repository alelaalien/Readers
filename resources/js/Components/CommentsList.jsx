import { useState } from "react";
import OneComment from "./OneComment"; 

export default function CommentList({item, auth, comments})
{
 
const element = item;
const [commentList, setCommentList] = useState(comments); 
 
let rand = Math.random();
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
            
            if(response ){ document.getElementById('comment-content').value = ''; 
            setCommentList(response.comments); 
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
              auth.user != null && auth.user.id ?
              ( <> <button 
                    className="btn btn-primary comment-btn float-right w-24" 
                    onClick={sendComment} style={{marginTop: '1%'}}>Send</button></> )
              : ( <><span style={{color:'#8c8a8a'}}> You must to be registered to comment </span></> ) 
            } 
              </div> 
            
           
            <div className="card-body">  
              <ul className="list-group list-group-flush" key={`list-data-${item.id}-${rand}`} id="list-data-id"> 
                
                {
                  commentList.map((element, index) => {
                    return( 
                    
                    <li className="list-group-item" style={{border:'none'}} key={`list-${index}`}> 
   
                    <OneComment comment={element} auth={auth} key={`one-comment${element.id}-${index}`}></OneComment>
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