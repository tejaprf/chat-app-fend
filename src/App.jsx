import './App.css'
import Login from "./pages/login/Login.jsx"
import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate, useNavigate } from 'react-router-dom';
import SignUp from './pages/signup/SignUp.jsx';
import { Home } from './pages/home/Home.jsx';
import axios from 'axios';
import Demo from './pages/Demo.jsx';
import api from './apis.jsx';
import { useGlobalContext } from './context/useContext.jsx';

// const serverUrl=import.meta.env.VITE_BACKEND_URL;

function App() {
  // useEffect(()=>{
  // },[])
  const {globalState,setGlobalState}=useGlobalContext();
  useEffect(()=>{
    const checkAuth=async ()=>{
      try{
        const res=await api.get(`isAuth`);
        // console.log(res.data);
        // setGlobalState({...globalState,isAuth:true});
        setGlobalState({...res.data,isAuth:true});

      }catch(err){
        // console.log(err)
        setGlobalState({...globalState,isAuth:false});
      }
    }
    checkAuth();

  },[])




  return (
    <div className='p-4 h-screen w-5/6 flex flex-col items-center justify-center'>
      <Router>
      <Routes>
        <Route path="*" element={globalState.isAuth?<Navigate to="/sidebar"/>:<Navigate to="/login"/>} />
        <Route path="/login" element={globalState.isAuth?<Navigate to="/sidebar"/>:<Login/>} />
        <Route path="/signup" element={globalState.isAuth?<Navigate to="/sidebar"/>:<SignUp/>} />
        <Route path="/sidebar" element={globalState.isAuth?<Home/>:<Navigate to={"/login"}/>} />
        {/* <Route path="/demo" element={<Demo/>} /> */}
      </Routes>
      </Router>
    </div>
  )
  // return (
  //   <div className=' h-screen  flex flex-col items-center justify-center w-11/12'>
  //     <Router>
  //     <Routes>
  //       <Route path="*" element={<Login/>} />
  //       <Route path="/signin" element={<Login/>} />
  //       <Route path="/signup" element={<SignUp/>} />
  //       <Route path="/sidebar" element={<Home/>} />
  //       {/* <Route path="/demo" element={<Demo/>} /> */}
  //     </Routes>
  //     </Router>
  //   </div>
  // )
}

export default App;
