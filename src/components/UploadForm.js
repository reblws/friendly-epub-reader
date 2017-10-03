import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import db from '../db';
import { parseEpub } from '../utils/parse-epub';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
      parseEpub(file, this.props.loadBooks);
    });
    this.setState({
      files: acceptedFiles,
    });
    // Parse the zip here
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop}>
            <p>Drop some files here!</p>
          </Dropzone>
        </div>
        <aside>
          <h2>
            Dropped Files
          </h2>
          <ul>
            {this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
          </ul>
        </aside>
      </section>
    );
  }
}

export default UploadForm;
