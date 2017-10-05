import React, { Component } from 'react';
import BookUploadForm from '../screens/BookUploadForm';
import BookDetailsForm from '../screens/BookDetailsForm';

class UploadLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    document.title = 'Upload an ePub | Friendly ePub Reader';
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  render() {
    const { files } = this.state;
    return (files.length === 0)
      ? <BookUploadForm onDrop={this.onDrop} />
      : <BookDetailsForm files={files} />;
  }
}

export default UploadLayout;
