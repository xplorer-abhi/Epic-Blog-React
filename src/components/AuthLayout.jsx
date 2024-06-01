// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function AuthLayout({ children, authentication = true }) {
//     const navigate = useNavigate();
//     const [loader, setLoader] = useState(true);
//     const authStatus = useSelector(state => state.auth.status);

//     useEffect(() => {
//         if (loader) return; // Skip redirect until loader is false

//         if (authentication && !authStatus) {
//             navigate("/login");
//         } else if (!authentication && authStatus) {
//             navigate("/");
//         }
//     }, [authStatus, navigate, loader, authentication]);

//     useEffect(() => {
//         // Set loader to false after initial render
//         setLoader(false);
//     }, []);

//     return loader ? <h1>Loading...</h1> : <>{children}</>;
// }

// // Prop types validation
// AuthLayout.propTypes = {
//     children: PropTypes.node.isRequired,
//     authentication: PropTypes.bool
// };

// export default AuthLayout;






import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    // Protected.propTypes = {
    //     children: PropTypes.string.isRequired,
    //     authentication : true
    //   }

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected

