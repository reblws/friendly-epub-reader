import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import db from '../db';
import parseEpub from '../utils/parse-epub';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      books: [],
    }
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    db.table('books')
      .toArray()
      .then((books) => {
        this.setState({ books })
      })
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
          <ul>
            {this.state.books.map(({ authors, title, publishedAt }) => (
              <dl key={title}>
                <dt>Author</dt>
                  <dd>{authors}</dd>
                <dt>Title: </dt>
                  <dd>{title}</dd>
                <dt>Publish Date:</dt>
                  <dd>{publishedAt}</dd>
              </dl>
            ))}
          </ul>
        </aside>
      </section>
    );
  }
}

export default UploadForm;
