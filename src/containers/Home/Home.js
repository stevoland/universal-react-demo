import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isLoaded as isRepoListLoaded, load as loadRepoList } from 'redux/modules/repoList';

export class PlainHome extends Component {
  static propTypes = {
    repoList: PropTypes.object.isRequired
  };

  static fetchDataDeferred(getState, dispatch) {
    const username = getState().user.data.login;

    const promises = [];
    if (!isRepoListLoaded(getState(), username)) {
      promises.push(dispatch(loadRepoList(username)));
    }

    return Promise.all(promises);
  }

  renderItem(item, index) {
    return (
      <li key={index}>
        <Link to={`/repos/${item.name}`}>{item.name}</Link>
      </li>
    );
  }

  render() {
    const styles = require('./Home.scss');
    const { loaded, error, items } = this.props.repoList;
    let content;

    if (loaded) {
      content = <ul>{items.map(this.renderItem)}</ul>;
    } else if (error) {
      content = <p>There was a problem</p>;
    }

    return (
      <div className={styles.Home}>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    repoList: state.repoList
  };
}

export default connect(mapStateToProps)(PlainHome);
