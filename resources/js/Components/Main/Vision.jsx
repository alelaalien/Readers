import React, { useEffect, useState } from "react";

const Vision = () =>{

    const [token, setToken] = useState(null);
 
   
    useEffect(() => {
        const token = async () =>{
            try {
                const response = await fetch('http://127.0.0.1:8000/csrf-token');
                if (response.ok) {
                const  data = await response.json();
           
                setToken(data.csrf_token);   
            }else{
                console.error('Error response', error);
            }
               
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        token();  
    }, []);  

    return (
        <div className="w-full text-center bg-black h-64 absolute top-0" style={{padding: '7%', color: 'wheat', position: 'inherit'}}>
            <div className="container text-center">
                {token ?(<input type="hidden" id="csrf" value={token}/>): null}
                <h1 className="txt--maxlight">Online Store</h1>      
                <p className="txt--maxlight">Mission, Vision & Values</p>
            </div> 
        </div>
    );
}

export default Vision;
