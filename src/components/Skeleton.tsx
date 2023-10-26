import Header from "./Header/Header.tsx";
import {TChildren} from "./AuthProviderSkeleton.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Skeleton = ({children}:TChildren) => {



    return (
       <>
           <Header/>
           {children}
           <ToastContainer limit={1}  draggablePercent={40} />

       </>
    )
}

export default Skeleton