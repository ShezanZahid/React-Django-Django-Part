import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useState, useEffect, useContext } from "react";


export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  console.log(token);
 
  return (
    <Route
   
      {...rest}
      render=
      {props => {
        
        if (token === null || token === undefined) {
            return <Redirect to="/login" />

        }else{
            return <Component {...props}/>
        }
      }}/>
      );


    // const token = getStorageData("access");
    // // console.log("IN Admin: " + token);

    // if (token === null || token === undefined) {
    //   return <Redirect to="/" />;
    // }
    }
