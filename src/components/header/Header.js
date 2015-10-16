import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
  static propTypes = {
    fullName: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <h1>{this.props.fullName}</h1>
      </div>
    );
  }
}
