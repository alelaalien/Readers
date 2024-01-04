import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";


export default function Statics()
{

    return(

        <div className="flex" style={{width: '70%'}}>
            <div className="flex" style={{marginRight: '2%'}}> 
                    <FontAwesomeIcon icon={faEye} className="self-end text-muted"/>
                    <p className="mb-0 self-end text-muted text-xs ml-2">1068 views</p>
                
            </div> 
            <div className="flex" style={{marginRight: '2%'}}>
                 
                    <FontAwesomeIcon icon={faHeart} className="self-end text-muted"/>
                    <p className="mb-0 self-end text-muted text-xs ml-2">1842 votes</p>
                
            </div>
            <div className="flex" style={{marginRight: '2%'}}>
                
                        <FontAwesomeIcon icon={faStar} className="self-end text-muted"/>
                    <p className="mb-0 self-end text-muted text-xs ml-2">300 favorites</p>
                
            </div>
            <div className="flex" style={{marginRight: '2%'}}>
                        <FontAwesomeIcon icon={faTrophy} className="self-end text-muted"/>                
                    <p className="mb-0 self-end text-muted text-xs ml-2">0  outstanding work</p>
                
            </div>
        </div>
    );

}