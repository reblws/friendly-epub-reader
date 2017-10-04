import React from 'react';
import {
  Form,
  Input,
  Button,
  Loader,
  Segment,
  Dimmer,
  Header,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { parseEpub } from '../services/parse-epub';
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
    }
  }

  componentDidMount() {
    const { files } = this.props;
    parseEpub(files[0], this.setBookDetails)
  }

  setBookDetails(book) {
    this.setState({ book });
  }

  onSubmit() {
    // TODO: Validate properly
    const isFormValid = true;
    if (isFormValid) {
      db.books.put(this.state.book);
      this.setState({
        submitted: true,
      })
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

  render() {
    const { submitted } = this.state;
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
        <Form onChange={this.onChange}>
          <Form.Field control={Input} name="title" label="Book Title" value={title}/>
          <Form.Field control={Input} name="authors" label="Authors" value={authors} />
          <Form.Field control={Input} name="publishedAt" label="Date of Publication" type="date" value={publishedAt} />
          <Form.Field control={Input} name="language" label="Language" value={language}/>
          <Form.Field control={Input} name="subject" label="Subject Matter" value={subject}/>
          <Form.Group inline>
            <Form.Button primary onClick={this.onSubmit}>Submit</Form.Button>
            <Form.Button secondary as={Link} to="/">Cancel</Form.Button>
          </Form.Group>
        </Form>
      </Segment>
    );

  }
}

export default BookDetailsForm;
