import React from 'react';
import Header from './components/header';

const App = (props) => (
  <div>
    <div className='row'>
      <Header />
      {props.children}
    </div>
  </div>
);

export default App;
