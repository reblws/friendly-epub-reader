import React, { Component } from 'react';
import UploadForm from '../components/UploadForm';
import BackButton from '../components/BackButton';
import NavMenu from '../components/NavMenu';
import UserBookListing from '../components/UserBookListing';
import db from '../db';
import { Container, Header, Divider } from 'semantic-ui-react';

class IndexLayout extends Component {
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
      <Container style={{ marginTop: 10 }}>
        <Header size="huge">Friendly ePub Reader</Header>
        <Container text>
          This is a really good website. Hello world, welcome to the friendly ePub reader, an offline-first webapp for managing your ePubs. Why don&rsquo;t you try uploading a book and checking it out! The books are saved offline and with your browser forever.
        </Container>
        <Header size="big" dividing>Your Books</Header>
        <UserBookListing books={this.state.books} />
      </Container>
    );
  }
}

export default IndexLayout;
