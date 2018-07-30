import React from "react";
import { Link } from "react-router-dom";

import BookCategory from "./BookCategory";
import * as BooksAPI from "../BooksAPI";

class BookList extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.retreiveBooks();
  }

  retreiveBooks() {
    return BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  UpdateBookList(book, shelf) {
    return BooksAPI.update(book, shelf).then(() => {
      this.retreiveBooks();
    });
  }

  selectByShelf(shelf) {
    const bookList = this.state.books.filter(book => book.shelf === shelf);
    return bookList;
  }
  render() {
    const categories = [
      { label: "currentlyReading", value: "Currently Reading" },
      {
        label: "wantToRead",
        value: "Want to Read"
      },
      { label: "read", value: "Read" }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {categories.map((category, index) => (
            <BookCategory
              key={index}
              label={category.value}
              shelfBooks={this.selectByShelf(category.label)}
              updateBook={this.UpdateBookList.bind(this)}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search"> Search </Link>
        </div>
      </div>
    );
  }
}

export default BookList;
