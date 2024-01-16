import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function CustomButton(){
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button onClick={handleClick}>---{count}---</button>
  );
}

function AboutPage({zawartosc} : {zawartosc:string}) {
  return (
    <>
      <h1>{zawartosc}</h1>
      <p>Hello there.<br />How do you do {}?</p>
    </>
  );
}


const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Testing ground</p>
      </header>
      <body>
        
      </body>
    </div>
  );
}

export default App;
