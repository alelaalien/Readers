import React, { useEffect, useState } from "react";

export default function OnePoem({poem})
{   
    const [content, setContent] = useState('');

    useEffect(() =>{
       
        let result = poem.content.substring(1, 250);

        let val = result.replace(/(\r\n|\n|\r)/gm, "");
       console.log(val);
        document.getElementById(`poemContent-${poem.id}`).innerText = val+'...';
    
    }, []);
 
 
 

    return(
            <div style={{background:'white', height: '250px', padding:'2%', marginTop: '15px', borderRadius : '0.65rem',background: 'linear-gradient(90deg, rgb(226, 210, 232) 0%, rgba(249, 237, 64, 0.35) 50%, rgba(68, 31, 12, 0.72) 100%)'}}>                
            <div className="flex flex-row"
                style={{background: '#ffffffa8',borderRadius: '1rem', padding: '12px'}}> 
           
                    <div>
                        <div className="flex" style={{justifyContent: 'space-between'}}>
                            <h4 className="w-full text-center">{poem.title}</h4> 
                            <span className="text-muted">12-12-2012</span>
                        </div> 
                        <p className="poemContent text-justify mb-0" id={`poemContent-${poem.id}`}></p> 
                        <div className="w-full" style={{justifyContent: 'space-between'}}>
                           <a href="" className="w-6/12 inline-flex"><h5>El autor </h5></a> 
                           <a href={`/poem/${poem.id}`}><button className="btn">View</button> </a>
                        </div>
                        
                    </div>
                </div>  
                <div style={{justifyContent: 'space-between'}}>
                   <label className="rounded-lg bg-teal-400 mt-2" style={{padding: '0.5%', margin: '10px 15px 0 2px'}}>lala</label><label>lala</label><label>lala</label> 
                </div>
                
            </div> 
    );


}