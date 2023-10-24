import React from 'react';
import Header from "./Header/Header.tsx";
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