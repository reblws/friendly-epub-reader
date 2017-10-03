import React, { Component } from 'react';
import UploadForm from './components/UploadForm';
import BackButton from './components/BackButton';
import NavMenu from './components/NavMenu';
import { Container } from 'semantic-ui-react';
import db from './db';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
    this.loadBooks = this.loadBooks.bind(this);
    // this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    db.books.toArray().then(books => {
      this.setState({
        books: books.map(({ id, title, authors, publishedAt }) => ({
          id, title, authors, publishedAt,
        })),
      });
    });
  }

  render() {
    return (
      <div className="App">
        <NavMenu books={this.state.books} />
        <div style={{ marginLeft: 250, }}>
          <Container className="App">
            <BackButton />
            <UploadForm loadBooks={this.loadBooks} />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
