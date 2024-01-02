import React, { useState,useEffect } from "react"; 

export default function ReactionBar({auth, poem}) {

 
  const [heartChecked, setHeartChecked] = useState(false);
  const [favoritesChecked, setFavoritesChecked] = useState(false);
  const [followUserChecked, setFollowUserChecked] = useState(false);

  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
 
  const handleFavoritesChange = () => {

    if(auth.user)
    setFavoritesChecked(!favoritesChecked);
  };

 
  const handleHeartChange = (e) => {
    if(auth.user)
   setHeartChecked(!heartChecked);
    
  };
 
  const handleFollowUserChange = async (e) => {
  
    e.preventDefault();
 
      const requestOptions = {
        method: 'post',
       
        credentials: 'same-origin',
        headers: {'X-CSRF-TOKEN': token, 'Content-Type': 'application/json'},
        body:JSON.stringify({followed_id: poem.user_id })

      }
 
     if(auth.user){
      fetch('http://127.0.0.1:8000/follow', requestOptions)
          .then(response => {
             
           return response.json();
             
          }).then(response =>{
            response == 0 ? 
            setFollowUserChecked(!followUserChecked):
            setFollowUserChecked(followUserChecked);
          })
          .catch(error => {
          
            console.error('Error al realizar la solicitud:/', error);
          });}
    
  
  };
  
  return (
    <div className="w-full text-right" style={{ background: "#eee" }}>
      <div className="text-right flex">
        {/* corazon */}
        <label className="ilike" title="I love it!">
          <input
            type="checkbox"
            id="ilikeCheckbox"
            checked={heartChecked}
            onChange={handleHeartChange}
          />
          <img
            className={`heart-icon ${!heartChecked ? "grayscale" : ""}`}
            src="../img/assets/heart-icon.png"
            style={{ width: "85%" }}
            alt="Heart Icon"
          />
        </label>
        {/* estrella */}
        <label className="ilike" title="I love it!">
          <input
            type="checkbox"
            id="favorites"
            checked={favoritesChecked}
            onChange={handleFavoritesChange}
          />
          <img
            className={`star-icon ${!favoritesChecked ? "grayscale" : ""}`}
            src="../img/assets/star-icon.png"
            style={{ width: "85%" }}
            alt="Star Icon"
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
              src="../img/users/profile.png"
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
