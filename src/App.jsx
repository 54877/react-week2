import React, { useEffect } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "./Login";
import IndexApp from "./IndexApp";
import Cookies from "js-cookie";
import axios from "axios";

// const URL = import.meta.env.VITE_BASE_URL,
//       PATH= import.meta.env.VITE_API_PATH;  

function App() {
    const navigate = useNavigate()
  
    useEffect(()=>{
      const token = Cookies.get('token')
      //避免未登入時取得token
      if(token){
        axios.defaults.headers.common['Authorization'] = token;
      }else{
        navigate('./Login');
      }
    },[])


    return (
      <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/IndexApp" element={<IndexApp />} />
        </Routes>
      </>
    );
}

export default App;

