import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Stats } from '../../components';
import { isLoaded as isRepoListLoaded, load as loadRepoList } from 'redux/modules/repoList';

// Export for or testing
export const styles = require('./Home.scss');


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
      <li key={index} className={styles.Item}>
        <Link to={`/repos/${item.fullName}`}>{item.name}</Link>
        <Stats className={styles.Stats}
          stars={item.stargazersCount} watchers={item.watchersCount} forks={item.forksCount} />
      </li>
    );
  }

  render() {
    const { loaded, error, items } = this.props.repoList;
    let content;

    if (loaded) {
      content = <ul className={styles.List}>{items.map(this.renderItem)}</ul>;
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
