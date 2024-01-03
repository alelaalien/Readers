import React from "react";
import styled from "styled-components";

export default function Footer()
{
    return(
        <footer style={{background: 'rgb(70, 49, 31)', color: 'wheat'}}>
            <div className="container">
                <div className="row pt-6"> 
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="text-center">
                            <img className="img-fluid" src="../img/users/profile.png" alt="logo" width={'128px'} />
                            
                            <div className="text-left m-auto" style={{width:'fit-content'}} >
                                <div>aca va el email</div>
                                <div>aca va cualquier cosa</div>
                                <div>aca va el email</div>
                                <div>aca va cualquier cosa</div>
                            </div> 
                            
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-6">
                        <div>
                            <h6>enlace</h6>
                            <h6>enlace</h6>
                            <h6>enlace</h6>
                            <h6>enlace</h6>
                            <h6>enlace</h6>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <h5 className="pt-4">Social medias</h5>
                        <div className="flex">
                            <span>fb</span>
                            <span>fb</span>
                            <span>fb</span>
                            <span>fb</span>
                            <span>fb</span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                            <div>
                                <h5>contact</h5>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Your name..." />
                                    <input className="form-control" type="text" placeholder="Your email" />
                                    <textarea name="" id=""   rows="3" className="form-control"></textarea>
                                    <button className="btn btn-send">Send</button>
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