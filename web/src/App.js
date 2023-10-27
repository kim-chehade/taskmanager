import * as React from "react";

import {  createBrowserRouter,  Outlet,  RouterProvider,} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import "./style.scss";


function Dashboard(){
  return(
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
    ]
  },


]);

function App() {
  return (
    <div className="app">
      <div className="container">
    <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
