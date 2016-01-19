import React from 'react';
import {connect} from 'react-redux';

import {updateText} from '../../actions/ExampleActions';

const Home = React.createClass({
  requestUpdateText() {
    this.props.dispatch(updateText('hello redux'));
  },

  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <button onClick={this.requestUpdateText}>update</button>
        <p>press ctrl+h to toggle devtools</p>
      </div>
    );
  }
});

function select(state) {
  return {
    text: state.example.text
  };
}

export default connect(select)(Home);
