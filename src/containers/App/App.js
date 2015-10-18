import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { isLoaded as isUserLoaded, load as loadUser } from 'redux/modules/user';
import { Header } from '../../components';

const USERNAME = 'gaearon';

const styles = require('./App.scss');

const meta = {
  title: 'Repo browser',
  meta: {
    charSet: 'utf-8'
  }
};

export class PlainApp extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isUserLoaded(getState())) {
      promises.push(dispatch(loadUser(USERNAME)));
    }

    return Promise.all(promises);
  }

  render() {
    const { name, avatarUrl } = this.props.user.data;

    return (
      <div className={styles.App}>
        <DocumentMeta {...meta}/>
        <div className={styles.Header}>
          <Header fullName={name} avatar={avatarUrl} />
        </div>
        <div className={styles.AppContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({user: state.user}))(PlainApp);
