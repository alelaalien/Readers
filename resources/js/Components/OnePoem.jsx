import React, { useEffect, useState } from "react";
import Statics from "./Statistics"; 


export default function OnePoem({poem, onClickFromParent})
{       
 
    const viewRelated =(e)=>{  onClickFromParent(e.target.id); }

    useEffect(() =>{
       
        let result = poem.content.substring(0, 260);

        let val = result.replace(/(\r\n|\n|\r)/gm, "");
      
        document.getElementById(`poemContent-${poem.id}`).innerText = val+'...';
    
    }, []); 
  
    return(
            <div className="col-lg-12" style={{background:'white', padding:'2%', marginTop: '15px', borderRadius : '0.65rem',background: 'linear-gradient(90deg, rgb(226, 210, 232) 0%, rgba(249, 237, 64, 0.35) 50%, rgba(68, 31, 12, 0.72) 100%)'}}>                
            <div className="flex flex-row overflow-hidden"
                style={{background: '#ffffffa8',borderRadius: '1rem', padding: '12px'}}>  
                    <div>
                        <div className="flex" style={{justifyContent: 'space-between'}}>
                            <h4 className="w-full text-center text-base font-bold">{poem.id}-{poem.title}</h4> 
                            <span className="text-muted">12-12-2012</span>
                        </div> 
                        <p className="poemContent text-justify mb-0" style={{fontSize: '14px'}} id={`poemContent-${poem.id}`}></p> 
                        <div className="w-full flex" style={{justifyContent: 'space-between'}}>
                            <h5 className="text-base font-bold underline capitalize"> {poem.author} </h5> 
                        </div> 
                    </div>
                </div>  
                <div className="text-center" style={{justifyContent: 'space-between'}}> 
                        {
                            poem.tags.map(element=> (
                                <label style={{background: '#5b4e3d', padding: '1%'}} key={`tag-poem-${element.tag_id}${Math.random()}`} className="rounded-lg p-0.5 m-10 mx-15 my-0 ml-2 mt-10 bg-77564e text-white mt-2 cursor-pointer text-base "
                                onClick={viewRelated} id={element.id}>{element.tag}</label> 
                            )) 
                        } 
                </div>
                <div className="flex" style={{justifyContent: 'space-between'}}>
                    <Statics></Statics>
                    <div style={{width: 'fit-content', alignContent: 'right', textAlign: 'right'}} className="grid">
                        <a href={`/poem/${poem.id}`}><button className="btn">View</button></a> 
                    </div>
                </div>
                
            </div> 
    );


}