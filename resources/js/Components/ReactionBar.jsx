import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";

export default function ReactionBar({auth, poem}) {

 
  const [heartChecked, setHeartChecked] = useState(false);
  const [favoritesChecked, setFavoritesChecked] = useState(false);
  const [followUserChecked, setFollowUserChecked] = useState(false);
 
  const handleFavoritesChange = () => {
    setFavoritesChecked(!favoritesChecked);
  };

  const handleFollowUserChange = () => {
    setFollowUserChecked(!followUserChecked);
  };
  const handleHeartChange = (e) => {
    
   setHeartChecked(!heartChecked);
    
  };
 
  const handleSubmitFollow = async (e) => {
 
    e.preventDefault();
 
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
  
  };
 
  
 

  return (
    <div className="w-full text-right" style={{ background: "#eee" }}>
      <div className="text-right flex">
        <label className="ilike" title="I love it!">
          <input
            type="checkbox"
            id="ilikeCheckbox"
            checked={heartChecked}
            onChange={handleHeartChange}
          />
          <img
            className={`heart-icon ${!heartChecked ? "grayscale" : ""}`}
            src="img/assets/heart-icon.png"
            style={{ width: "85%" }}
            alt="Heart Icon"
          />
        </label>
 
      
        <div style={{ width: "54px" }}>
          <div
            className={`follow-user relative inline-block cursor-pointer h-auto flex ${
              !followUserChecked ? "grayscale" : ""
            }`}
            title="Follow user"
          >
            <input
              type="checkbox"
              id="followUserCheckbox"
              className="z-10 absolute w-12 h-10 opacity-0"
              style={{  bottom: '3px', right: '4px'}}
              checked={followUserChecked}
              onChange={handleFollowUserChange}
            />
            <label className="heart-label"></label>
            <img
              src="img/users/profile.png"
              className="w-24 h-auto user-image"
              alt="User thumbnail"
              style={{
                borderRadius: "50%",
                transition: "filter 0.3s ease",
              }}
            />
            <div
              className="absolute bg-gray-500 w-10 h-1"
              style={{
                borderRadius: "90%",
                bottom: "-6px",
                right: "9px",
              }}
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
