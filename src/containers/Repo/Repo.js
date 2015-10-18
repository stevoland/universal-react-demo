import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { TimeAgo, Stats } from '../../components';
import { isLoaded as isRepoLoaded, load as loadRepo } from 'redux/modules/repo';

function getFullRepoName(userName, repoName) {
  return `${userName}/${repoName}`;
}

const styles = require('./Repo.scss');

export class PlainRepo extends Component {
  static propTypes = {
    repo: PropTypes.object.isRequired
  };

  static fetchDataDeferred(getState, dispatch, location, params) {
    const name = getFullRepoName(params.userName, params.repoName);

    const promises = [];
    if (!isRepoLoaded(getState(), name)) {
      promises.push(dispatch(loadRepo(name)));
    }

    return Promise.all(promises);
  }

  render() {
    const { loaded, error, data } = this.props.repo;
    let content;

    if (loaded) {
      content = (
        <div>
          <div className={styles.Header}>
            <h2>
              {data.name}
              <TimeAgo prefix="Last updated" value={data.updatedAt} />
            </h2>
            <Stats className={styles.Stats}
              stars={data.stargazersCount} watchers={data.watchersCount} forks={data.forksCount} />
          </div>
          <p>{data.description}</p>
        </div>
      );
    } else if (error) {
      content = <p>There was a problem</p>;
    }

    return (
      <div className={styles.Repo}>
        {content}
        <p>
          <Link to="/">Back to list</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const repoName = getFullRepoName(props.params.userName, props.params.repoName);
  const data = state.entities && state.entities.repos && state.entities.repos[repoName] || {};

  return {
    repo: {
      ...state.repo,
      data
    }
  };
}

export default connect(mapStateToProps)(PlainRepo);
