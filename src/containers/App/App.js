import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

const meta = {
  title: '',
  meta: {
    charSet: 'utf-8'
  }
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
