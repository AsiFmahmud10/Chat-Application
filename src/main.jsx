import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { StompSessionProvider } from "react-stomp-hooks";
import Home from "./pages/Home";

// routing
const router = createBrowserRouter([
  {
    path: "/reg",
    element: <Registration />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* connect to websocket */}
     <StompSessionProvider 
        onConnect={()=>{console.log("hello")}} 
        url={"http://localhost:8082/ws"}
     >
        <RouterProvider router={router} /> 
     </StompSessionProvider>
    
  </React.StrictMode>
);
