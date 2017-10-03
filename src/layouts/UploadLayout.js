import React, { Component } from 'react';
import db from '../db';
import { parseEpub } from '../utils/parse-epub';
import UploadForm from '../components/UploadForm';

class UploadLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
      parseEpub(file);
    });
    this.setState({
      files: acceptedFiles,
    });
    // Parse the zip here
  }

  render() {
    return (
      <UploadForm onDrop={this.onDrop} />
    );
  }
}

export default UploadLayout;
