import React from "react";
import 'font-awesome/css/font-awesome.min.css';

export default function Statics()
{

    return(

        <div className="flex" style={{width: '70%'}}>
            <div className="flex" style={{marginRight: '2%'}}>
                
                    <img src="../img/assets/ojo.png"  style={{width: '29px', filter: 'grayscale(100%)'}}  alt="Ver" /> 
                    <p className="mb-0 self-end text-muted text-xs">1068 views</p>
                
            </div> 
            <div className="flex" style={{marginRight: '2%'}}>
                
                    <img src="../img/assets/heart-icon.png" style={{width: '26px', filter: 'grayscale(100%)'}} alt="Heart" />
                    <p className="mb-0 self-end text-muted text-xs">1842 votes</p>
                
            </div>
            <div className="flex" style={{marginRight: '2%'}}>
                
                    <img src="../img/assets/star-icon.png" style={{width: '26px', filter: 'grayscale(100%)'}} alt="star-icon" />
                    <p className="mb-0 self-end text-muted text-xs">300 favorites</p>
                
            </div>
            <div className="flex" style={{marginRight: '2%'}}>
                
                    <img src="../img/assets/copa.png" style={{width: '26px', filter: 'grayscale(100%)'}} alt="Coup"/>
                    <p className="mb-0 self-end text-muted text-xs">0  outstanding work</p>
                
            </div>
        </div>
    );

}