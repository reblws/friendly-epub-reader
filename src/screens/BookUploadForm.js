import React from 'react';
import Dropzone from 'react-dropzone';

const BookUploadForm = ({ onDrop }) => (
  <Dropzone
    accept=".epub"
    multiple={false}
    onDrop={onDrop}
  >
    <div>Drop or click here to upload an ePub.</div>
  </Dropzone>
);

export default BookUploadForm;
