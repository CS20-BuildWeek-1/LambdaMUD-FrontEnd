import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Adventure from "./components/Adventure";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App-container">
        <Route exact path="/" component={Login} />
        {/* <Route path="/register" component={Register} /> */}
        <Route path="/adventure" component={Adventure} />
      </div>
    );
  }
}

export default App;
