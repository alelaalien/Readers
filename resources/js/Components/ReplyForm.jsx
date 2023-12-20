import React from "react"
import { useState, useEffect } from "react";

export default function ReplyForm({auth, commentId})
{
 
    let name = "content-"+commentId;
 
    const sendReply = async (e) => {
        e.preventDefault();
    
        try {
            let txtarea = document.getElementById(name);
            let content = txtarea.value;
    
            const response = await fetch('http://127.0.0.1:8000/csrf-token');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const csrfToken = data.csrf_token;
    
            const requestOptions = {
                method: 'post',
                credentials: 'same-origin',
                headers: { 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: content, comment_id: commentId })
            };
   
            const replyResponse = await fetch('http://127.0.0.1:8000/addReply', requestOptions);
            if (!replyResponse.ok) {
                throw new Error('Add reply request failed');
            }
    
            const responseData = await replyResponse.json();
            if(responseData == 'ok'){
                txtarea.value = '';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }; 

    return(
        <div className="row "> 
            <div className="form-group" style={{paddingLeft: '10%'}}>  
                <textarea id={name} className="form-control" rows="3" placeholder="Write your comment here"></textarea>
                
            </div>
            
             {auth.user.id ? (
                <button onClick={sendReply} className="btn btnsend comment-btn">Send</button>
             ):(
                <span> You must to be registered to comment </span>
             )} 
        </div>
 
    )
}