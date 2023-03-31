import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import SideBar from "./pages/SideBar";



function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
      </div>
      <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" exact element= {<Home />}/>
        <Route path="/add" exact element= {<Add/>}/>
        <Route path="/edit/:id" element= {<Edit/>}/>
      </Routes>
    </div>
    </BrowserRouter>

  );
}


export default App;
