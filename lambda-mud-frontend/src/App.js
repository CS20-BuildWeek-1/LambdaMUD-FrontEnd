import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Adventure from "./components/Adventure";
import Map from "./components/Map";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/adventure" component={Adventure} />
        <Route exact path="/map" component={Map} />
      </div>
    );
  }
}

export default App;
