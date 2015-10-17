import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Repo extends Component {
  render() {
    const styles = require('./Repo.scss');

    return (
      <div className={styles.Repo}>
        <p>
          <Link to="/">Go back</Link>
        </p>
      </div>
    );
  }
}
