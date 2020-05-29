import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Loading from './components/Loading';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Form />
      </div>
    </div>
  );
}

export default App;
