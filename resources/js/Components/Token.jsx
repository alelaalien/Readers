 
  import React from "react";

  const token = async ( ) => {
 
 
     
      fetch('http://127.0.0.1:8000/csrf-token')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const csrfToken = data.csrf_token;
          const requestOptions = {
            method: 'post',
           
            credentials: 'same-origin',
            headers: {'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json'},
            body:JSON.stringify({followed_id: poem.user_id })
    
          }
          fetch('http://127.0.0.1:8000/follow', requestOptions)
              .then(response => {
                 
               return response.json();
                 
              }).then(response =>{
                console.log(response);
              })
              .catch(error => {
              
                console.error('Error al realizar la solicitud:/', error);
              });
        })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      }); 
 }

 export default token;