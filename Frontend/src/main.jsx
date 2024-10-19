// all routing works on main jsx
// react router 
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CreateEmp from "./components/CreateEmp.jsx"
import ListEmp from "./components/ListEmp.jsx"
import UpdateEmp from "./components/UpdateEmp.jsx"
import ViewEmp from "./components/ViewEmp.jsx"
import ImageEmp from "./components/ImageEmp.jsx"

// create object
// render -> path ,element
const router = createBrowserRouter([
  {
    path : '/',
    element :<App/>,
    children :[
      {path:'/' , element:<ListEmp/>},
      {path:'/create' , element:<CreateEmp/>},
      {path:'/view/:id' , element:<ViewEmp/>},
      {path:'/update/:id' , element:<UpdateEmp/>},
      {path:'/image/:id' , element:<ImageEmp/>}


    ]


  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
