import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

const UploadButton = () =>
  <Button primary icon="upload" as={Link} to="/upload">Upload ePub</Button>;

export default UploadButton;
