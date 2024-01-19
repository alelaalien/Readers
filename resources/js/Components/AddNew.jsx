import React from "react";
import styled from "styled-components";

export default function AddNew({item, active})
{

    return(
        <div style={{width: 'fit-content'}} className="float-right">
            <div className="text-center p-4 pt-1">
                {active ?(

                    <a href={route(`${item}.create`)}>
                        <div className="btn btn-success w-full">Add new</div></a>  
                ) : (
                    <>
                        <div className="btn btn-success w-full disabled">Add new</div>
                        <p className="text-muted text-center">Login to create new content!</p>
                    </>
                )}
                
            </div>
          </div>
    );
}
