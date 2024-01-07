import React from "react";

export default function AddNew({item, active})
{
     
    return(
        <div className="text-center p-4">
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
    );
}