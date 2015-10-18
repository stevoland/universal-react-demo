import React, {Component, PropTypes} from 'react';
import SmartTimeAgo from 'react-smart-time-ago';

export default class TimeAgo extends Component {
  static propTypes = {
    prefix: PropTypes.node,
    value: PropTypes.string.isRequired
  }

  componentDidMount() {
    // Only display on client to avoid disparity of times from server
    this.renderTime = true;
    this.forceUpdate();
  }

  render() {
    const styles = require('./TimeAgo.scss');

    if (!this.renderTime) {
      return null;
    }

    return (
      <div className={styles.TimeAgo}>
        {this.props.prefix} <SmartTimeAgo value={this.props.value} />
      </div>
    );
  }
}
