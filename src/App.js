import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import BookList from "./components/BookList";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact component={BookList} />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
