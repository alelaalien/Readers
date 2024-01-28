import React, { useEffect, useState } from "react";
import Statics from "./Statistics"; 
import { useRef } from "react";

export default function OneThought({thought, onClickFromParent})
{       
    const myElementRef = useRef(null);
    const [isElementInView, setIsElementInView] = useState(false); 
    const [notViewed, setNotViewed] = useState(true);

    const viewRelated =(e)=>{  onClickFromParent(e.target.id); }

    useEffect(() =>{
       
        let result = thought.content.substring(0, 260);

        let val = result.replace(/(\r\n|\n|\r)/gm, "");
      
        document.getElementById(`thoughtContent-${thought.id}`).innerText = val+'...';
        
        window.addEventListener('scroll', handleScroll);
   
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [notViewed]); 

    const handleScroll = () => {
        if (myElementRef.current) {
          const elementRect = myElementRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
       
       
          const elementInView = elementRect.top < windowHeight && elementRect.bottom > 0;
          if(notViewed && elementInView){
              setIsElementInView(elementInView); 
               
              setNotViewed(!notViewed);  
          } 
        }
      };
  
    return(
            <div ref={myElementRef} className={`col-lg-12  ${isElementInView ? 'view' : 'loader'}`} style={{background:'white', padding:'2%', marginTop: '15px', borderRadius : '0.65rem',background: 'linear-gradient(90deg, rgb(226, 210, 232) 0%, rgba(249, 237, 64, 0.35) 50%, rgba(68, 31, 12, 0.72) 100%)'}}>                
            <div className="flex flex-row overflow-hidden"
                style={{background: '#ffffffa8',borderRadius: '1rem', padding: '12px'}}>  
                    <div>
                        <div className="flex" style={{justifyContent: 'space-between'}}>
                            <h4 className="w-full text-center text-base font-bold">{thought.id}-{thought.title}</h4> 
                            <span className="text-muted">12-12-2012</span>
                        </div> 
                        <p className="thoughtContent text-justify mb-0" style={{fontSize: '14px'}} id={`thoughtContent-${thought.id}`}></p> 
                        <div className="w-full flex" style={{justifyContent: 'space-between'}}>
                            <h5 className="text-base font-bold underline capitalize"> {thought.author} </h5> 
                        </div> 
                    </div>
                </div>  
                <div className="text-center" style={{justifyContent: 'space-between'}}> 
                        {
                            thought.tags.map(element=> (
                                <label style={{background: '#5b4e3d', padding: '1%'}} key={`tag-thought-${element.tag_id}${Math.random()}`} className="rounded-lg p-0.5 m-10 mx-15 my-0 ml-2 mt-10 bg-77564e text-white mt-2 cursor-pointer text-base "
                                onClick={viewRelated} id={element.id}>{element.tag}</label> 
                            )) 
                        } 
                </div>
                <div className="flex" style={{justifyContent: 'space-between'}}>
                    <Statics></Statics>
                    <div style={{width: 'fit-content', alignContent: 'right', textAlign: 'right'}} className="grid">
                        <a href={`/thought/${thought.id}`}><button className="btn">View</button></a> 
                    </div>
                </div>
                
            </div> 
    );


}