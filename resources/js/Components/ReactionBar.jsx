import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";

export default function ReactionBar({auth}) {
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
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  let formData = new FormData();
  formData.append('a' , 'a');
    fetch('http://localhost/poems',{
      method: "POST",
      headers: { "Access-Control-Allow-Origin": "*","Content-Type": "application/json"   },
      body: formData,
  })
  .then(async(response) => {
      // status 404 or 500 will set ok to false
      if (response.ok) {
          // Success: convert data received & run callback
          result = await response.json();
          callback(result);
      }
      else {
          throw new Error(response.status + " Failed Fetch ");
      }
  }).catch(e => console.error('EXCEPTION: ', e))
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
        <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email" 
        placeholder="Email"
      />
      <input
        type="password"
        name="password" 
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
      
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
