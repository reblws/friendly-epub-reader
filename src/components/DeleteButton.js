import React from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

// Contains a modal
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
    const {
      deleteBook,
      ...props,
    } = this.props;
    return (
      <div>
        <Button onClick={this.show} color="red" inverted content="Delete" icon="trash" {...props} />
        <Confirm
          open={this.state.show}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          confirmButton="Delete this book"
        />
      </div>
    );
  }
}

export default DeleteButton;
