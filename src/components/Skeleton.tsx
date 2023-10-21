import React from 'react';
import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import {TChildren} from "./AuthProviderSkeleton.tsx";


const Skeleton = ({children}:TChildren) => {



    return (
       <>
           <Header/>
           {children}
       </>
    )
}

export default Skeleton