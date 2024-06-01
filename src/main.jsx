
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import { AuthLayout, Login } from './components/index.js'

import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        {
            path: "/Home",
            element: <Home />,
        },
        {
            path: "/Login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/Signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/All-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/Add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/Edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        }
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
