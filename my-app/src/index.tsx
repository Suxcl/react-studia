import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//Redux
import { store } from './store';
import {Provider} from "react-redux";
// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import Blog from './pages/Blog';
import Test from './pages/Test';
import TestParams from './pages/TestParams';


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
          <Route path="TestParams/:id" element={<TestParams />} />
        </Route>
      </Routes>  
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
