import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../actions/flashMessagesActions';

class FlashMessagesList extends Component {
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    );
    return (
      <div>{messages}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFlashMessage: bindActionCreators(deleteFlashMessage, dispatch),
  }
}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.array.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessagesList);
