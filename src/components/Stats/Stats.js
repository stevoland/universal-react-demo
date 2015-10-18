import React, {Component, PropTypes} from 'react';

export default class Stats extends Component {
  static propTypes = {
    stars: PropTypes.number.isRequired,
    watchers: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    className: PropTypes.string
  }

  componentDidMount() {
    // Only display on client to avoid disparity of times from server
    this.renderTime = true;
    this.forceUpdate();
  }

  render() {
    const styles = require('./Stats.scss');

    const { stars, watchers, forks, className } = this.props;

    return (
      <dl className={styles.Stats + ' ' + className}>
        <dt className="visuallyhidden">Stars:</dt>
        <dd className={styles.Stars}>{stars}</dd>
        <dt className="visuallyhidden">Watchers:</dt>
        <dd className={styles.Watchers}>{watchers}</dd>
        <dt className="visuallyhidden">Forks:</dt>
        <dd className={styles.Forks}>{forks}</dd>
      </dl>
    );
  }
}
