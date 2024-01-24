import Guest from "@/Layouts/GuestLayout";
import React from "react";

export default function Index({auth})
{
    return(
        <Guest auth={auth}>

        </Guest>
    );
}