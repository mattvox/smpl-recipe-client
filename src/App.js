import React from 'react';
import Header from './components/header';

const App = (props) => (
  <div>
    <Header />
    {props.children}
  </div>
);

export default App;
