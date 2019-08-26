import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App-container">
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
