import React from "react";
import Footer from '../components/Footer/index';
import Header from '../components/Header/index'

function layoutDefault({children}) {
    
    return ( 
        <>
            <Header/>
            <div className="flex-1">{children}</div>
            <Footer/>
        </>
     );
}

export default layoutDefault;