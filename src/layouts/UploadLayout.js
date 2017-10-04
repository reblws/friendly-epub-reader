import React, { Component } from 'react';
import db from '../db';
import { parseEpub } from '../services/parse-epub';
import BookUploadForm from '../screens/BookUploadForm';
import BookDetailsForm from '../screens/BookDetailsForm';

class UploadLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
    this.onDrop = this.onDrop.bind(this)
  }

  onComponentDidMount() {
    document.title = 'Upload an ePub | Friendly ePub Reader';
  }

  onDrop(files) {
    this.setState({
      files,
    });
    // Parse the zip here
  }

  render() {
    const { files } = this.state;
    return (files.length === 0)
      ? <BookUploadForm onDrop={this.onDrop} />
      : <BookDetailsForm files={files} />;
  }
}

export default UploadLayout;
