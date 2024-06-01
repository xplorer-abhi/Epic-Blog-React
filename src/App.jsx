// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import './App.css';
// import authService from "./appwrite/auth";
// import { login, logout } from "./store/authSlice";
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
// import { Outlet } from 'react-router-dom';

// function App() {
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             try {
//                 const userData = await authService.getCurrentUser();
//                 if (userData) {
//                     dispatch(login({ userData }));
//                 } else {
//                     dispatch(logout());
//                 }
//             } catch (error) {
//                 console.log("Error fetching current user:", error);
//                 dispatch(logout());
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCurrentUser();
//     }, [dispatch]);

//     if (loading) {
//         return (
//             <div className='min-h-screen flex justify-center items-center bg-gray-500'>
//                 <div>Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className='min-h-screen flex flex-col justify-between bg-gray-500'>
//             <Header />
//             <main className='flex-grow'>
//                 <Outlet />
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default App;








import React from 'react'
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData)
        dispatch(login({userData}))
      else
        dispatch(logout())
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className=' w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App
