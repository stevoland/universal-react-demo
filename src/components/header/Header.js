import React, {Component, PropTypes} from 'react';


export default class Header extends Component {
  static propTypes = {
    fullName: PropTypes.string,
    avatar: PropTypes.string
  }

  render() {
    const styles = require('./Header.scss');
    const { avatar } = this.props;

    const image = avatar ? <img width={33} height={33} alt="" className={styles.Avatar} src={avatar} /> : null;

    return (
      <div className={styles.Header + ' clearfix'}>
        <h1>Popular repositories</h1>
        <div className={styles.Profile}>
          {image}
          <span className={styles.Name}>{this.props.fullName}</span>
        </div>
      </div>
    );
  }
}
