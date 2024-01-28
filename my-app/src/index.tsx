import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//Redux
import { store } from './store';
import {Provider } from "react-redux";
// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Pages
import Layout from './pages/layout';
import Blog from './pages/Blog';
import Test from './pages/Test';
import Register from './pages/Register';
import UserEdit from './pages/UserEdit';
import Login from './pages/Login';
import Profile from './pages/Profile';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Blog" element={<Blog />} />
          <Route path="Test" element={<Test />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path='UserEdit' element={<UserEdit/>}/>
          <Route path='Profile/:id' element={<Profile/>}></Route>
          <Route path="*" element={<Blog />} />
        </Route>
      </Routes>  
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
