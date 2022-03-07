import React, {useReducer, createContext} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Logout from './components/Logout'
import {
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'

import { initialState, reducer } from "./reducer/UseReducer";


// // we create a contextAPI 
export const UserContext = createContext();

const Routing =()=>{
  return(
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/logout" element={<Logout/>} />
  </Routes>
  )
}

const App =() =>{
const [state,dispatch] =useReducer(reducer,initialState)
  return(
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar/>
      <Routing/>
     
    </UserContext.Provider>
    </>
  )
}
export default App