import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faYoutube} from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";

export default function Footer()
{
    return(
        <footer style={{background: 'rgba(0, 0, 0, 0.97)', color: 'wheat'}}>
            <div className="container">
                <div className="row pt-6"> 
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                        <div className="text-center">
                            <img className="img-fluid m-auto" src="../img/users/profile.png" alt="logo" width={'128px'} />
                            
                            <div className="text-left" style={{width:'fit-content', margin: '13px auto 0'}} >
                                <p>aca va el email</p>
                                <p>aca va cualquier cosa</p>
                                <p>aca va el email</p>
                                <p>aca va cualquier cosa</p>
                            </div> 
                            
                        </div>
                    </div>
                    <div className="col-xl-3  col-lg-3 col-md-4 col-sm-4">
                        <div>
                            <ul className="pl-0">
                                <li className="flex">
                                    <FontAwesomeIcon icon={faCircle} style={{margin: '4% 7% 0 0'}} ></FontAwesomeIcon>
                                    <a href=""  className="no-underline text-white">
                                        
                                        <h6>About</h6>
                                    </a>
                                </li>
                                <li className="flex">
                                <FontAwesomeIcon icon={faCircle} style={{margin: '4% 7% 0 0'}} ></FontAwesomeIcon>
                                    <a href=""  className="no-underline text-white">
                                        <h6>Site Policies</h6>
                                    </a>
                                </li>
                                <li className="flex">
                                <FontAwesomeIcon icon={faCircle} style={{margin: '4% 7% 0 0'}} ></FontAwesomeIcon>
                                    <a href=""  className="no-underline text-white">
                                        <h6>Terms and Conditions</h6>
                                    </a>
                                </li>
                                <li className="flex">
                                <FontAwesomeIcon icon={faCircle} style={{margin: '4% 7% 0 0'}} ></FontAwesomeIcon>
                                    <a href=""  className="no-underline text-white">
                                        <h6>Credits and Attribution</h6>
                                    </a>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                        <h5 className="pt-4">Social medias</h5>
                        <div className="flex">
                            <a href="" className="no-underline mr-3">
                                <FontAwesomeIcon className="text-white text-3xl" icon={faFacebook}/>
                            </a>
                            <a href="" className="no-underline mr-3">
                                <FontAwesomeIcon className="text-white text-3xl" icon={faYoutube}/>
                            </a>
                            <a href="" className="no-underline mr-3">
                                <FontAwesomeIcon className="text-white text-3xl" icon={faLinkedin}/>
                            </a>   
                             
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div style={{background: 'rgba(44, 80, 102, 0.11)', marginBottom: '1rem', borderRadius: '0 3.6rem'}} className="mb-4"> 
                                <div className="form-group">
                                    <h5 className="text-uppercase text-center">contact</h5>
                                    <input className="form-control mb-4" type="text" placeholder="Your name..." />
                                    <input className="form-control mb-4" type="text" placeholder="Your email" />
                                    <textarea name="" id=""   rows="3" className="form-control mb-4"></textarea>
                                    <div className="text-center">
                                       <button className="btn btn-light m-auto">Send</button> 
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                 

            </div>
            <div className=" text-center" style={{background: 'rgb(30, 21, 13)', color: 'wheat'}}>
                        ©All rights reserved 
                    </div>
        </footer> 
    );
}

const First = styled.div`
`