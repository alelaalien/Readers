import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";

export default function TopButton({}){

    const scrollTop = () =>{

        window.scrollTo(0,0);
    } 

    return(
        <div onClick={scrollTop} style={{height: '50px', width: '50px'}} className="fixed h-12 w-12 bottom-0 right-0">
            <FontAwesomeIcon icon={faChevronCircleUp} style={{fontSize: '40px'}} fixedWidth/>
        </div>
    );
}