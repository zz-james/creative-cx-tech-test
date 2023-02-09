import React from "react";
import { Switch, Route } from "react-router-dom";

import "../App.css";
import Header from "./Header";
import MovieDetails from "./MovieDetails";
import MoviesList from "./MoviesList";

const App = () => {
  return (
    <div className="App">
      <Header text="MDB" />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <Switch>
        <Route exact path="/">
          <MoviesList />
        </Route>
        <Route path="/details/:id" component={MovieDetails} />
      </Switch>
    </div>
  );
};

export default App;
