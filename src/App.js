import React from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';

import './App.css'


function App() {
  return (
    <>
      <div className="content-wrapper">
        <Header />
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App;
