import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Navigation from './components/Navigation';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
}

export default App;
