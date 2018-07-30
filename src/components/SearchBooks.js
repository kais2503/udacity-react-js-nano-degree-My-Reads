import React from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

import * as BooksAPI from "../BooksAPI";

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: ""
  };
  handleQuery(query) {
    this.setState({ query });
    return this.SearchBookAPI();
  }

  SearchBookAPI() {
    const limit = 20;
    if (this.state.query) {
      return BooksAPI.search(this.state.query, limit).then(
        books => (books ? this.setState({ books }) : [])
      );
    }
    return this.setState({ books: [] });
  }

  rendredResult() {
    const { books } = this.state;

    if (!books) {
      return <div> Nothing to show </div>;
    }
    if (books && books.error) {
      return <div> No result to show </div>;
    }

    const element = this.state.books.map(book => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {book.imageLinks ? (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                }}
              />
            ) : null}

            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={e => this.changeShelf(book, e.target.value)}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    ));
    return element;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            {" "}
            Back{" "}
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.rendredResult()}</ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
