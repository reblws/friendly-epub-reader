import React from 'react';
import {
  Form,
  Input,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import parseEpub from '../services/parse-epub';
import db from '../db';

class BookDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.setBookDetails = this.setBookDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      book: {
        title: '',
        authors: [],
        publishedAt: '',
        language: '',
      },
      submitted: false,
      isDuplicate: false,
    }
  }

  componentDidMount() {
    const { files } = this.props;
    parseEpub(files[0], this.setBookDetails)
  }

  onSubmit() {
    // TODO: Validate properly
    const isFormValid = true;
    if (isFormValid) {
      db.books.put(this.state.book);
      this.setState({
        submitted: true,
      });
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    const newValue = name === 'authors'
      ? value.split(',').map(s => s.trim())
      : value;
    const bookDetails = this.state;
    this.setState({
      book: Object.assign({}, bookDetails, { [name]: newValue })
    });
  }

  setBookDetails(book) {
    // Run hash validation here. Only set state to book if there isn't an
    // entry in the db that has an equivalent hash.
    db.table('books').where('hash').equals(book.hash).count()
      .then(count => {
        // Show a message if the file is a duplicate, dont bother up
        if (count !== 0) {
          this.setState({ isDuplicate: true });
        } else {
          this.setState({ book });
        }
      })
      .catch(e => { throw e });
  }

  render() {
    const { submitted, isDuplicate } = this.state;
    const {
      authors,
      title,
      subject,
      publishedAt,
      language,
    } = this.state.book;
    return (
      <Segment>
        {submitted && <Redirect to="/" />}
        <Header as="h2">Confirm Book Details</Header>
        {!isDuplicate && <Form onChange={this.onChange}>
          <Form.Field control={Input} name="title" label="Book Title" value={title}/>
          <Form.Field control={Input} name="authors" label="Authors" value={authors} />
          <Form.Field control={Input} name="publishedAt" label="Date of Publication" type="date" value={publishedAt} />
          <Form.Field control={Input} name="language" label="Language" value={language}/>
          <Form.Field control={Input} name="subject" label="Subject Matter" value={subject}/>
          <Form.Group inline>
            <Form.Button primary onClick={this.onSubmit}>Submit</Form.Button>
            <Form.Button as={Link} to="/">Cancel</Form.Button>
          </Form.Group>
        </Form>}
        {isDuplicate && <div>Yo you already exist.</div>}
      </Segment>
    );

  }
}

export default BookDetailsForm;
