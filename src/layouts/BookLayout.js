import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import db from '../db';

export default class BookLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>{this.props.match.params['id']}</div>
    )
  }

}

