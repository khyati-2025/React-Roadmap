import './App.css';
import React from 'react';
import {useState} from 'react';

function App() {
  const [count, countApp] = useState(0);

  function increment(){
    countApp(count + 1);
  }
  function decrement(){
    countApp(count - 1);
  }
  function reset(){
    countApp(0);
  }

  return (
    <>
    
      

      <button id="incre" onClick={increment}>increment</button>
      <button id="decre" onClick={decrement}>decrement</button>
      <button id="reset" onClick={reset}>reset</button>
      <div className="display">Counting : {count}</div>
    </>
  );
}

export default App;
