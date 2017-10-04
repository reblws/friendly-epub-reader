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
import { parseEpub } from '../services/parse-epub';

class BookDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.setBookDetails = this.setBookDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      title: '',
      authors: [],
      publishedAt: '',
      language: '',
    }
  }

  componentDidMount() {
    const { files } = this.props;
    parseEpub(files[0], this.setBookDetails)
  }

  setBookDetails(book) {
    this.setState(book);
  }

  onSubmit() {
    // Do stuff to validate this.state.bookDetails
    console.log(this.state);
  }

  onChange(event) {
    const { name, value } = event.target;
    const bookDetails = this.state;
    const newValue = name === 'authors'
      ? value.split(',').map(s => s.trim())
      : value;
    this.setState(Object.assign({}, bookDetails, { [name]: newValue }));
  }

  render() {
    const {
      authors,
      title,
      subject,
      publishedAt,
      language,
    } = this.state;
    return (
      <Segment>
        <Header as="h2">Confirm Book Details</Header>
        <Form>
          <Form.Field control={Input} onChange={this.onChange} name="title" label="Book Title" value={title}/>
          <Form.Field control={Input} onChange={this.onChange} name="authors" label="Authors" value={authors} />
          <Form.Field control={Input} onChange={this.onChange} name="publishedAt" label="Date of Publication" type="date" value={publishedAt} />
          <Form.Field control={Input} onChange={this.onChange} name="language" label="Language" value={language}/>
          <Form.Field control={Input} onChange={this.onChange} name="subject" label="Subject Matter" value={subject}/>
          <Form.Button primary onClick={this.onSubmit}>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}

export default BookDetailsForm;
