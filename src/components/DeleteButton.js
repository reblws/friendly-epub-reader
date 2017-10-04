import React from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.show = this.show.bind(this);
  }

  handleConfirm() {
    const { deleteBook } = this.props;
    deleteBook();
    this.hide();
  }

  handleCancel() {
    this.hide();
  }

  hide() {
    this.setState({ show: false });
  }

  show() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button onClick={this.show} color="red" content="Delete" icon="trash" />
        <Confirm
          open={this.state.show}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default DeleteButton;
