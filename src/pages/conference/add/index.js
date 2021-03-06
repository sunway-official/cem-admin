import React from 'react';
import { ME_QUERY } from './helpers/mutation';
import { graphql, compose } from 'react-apollo';
import GetAllConfs from './addConference/getAllConferences';
import Loading from 'components/render/renderLoading';

class ConfMgtSidebar extends React.Component {
  render() {
    const { loading } = this.props.data;

    if (loading) return <Loading />;

    if (this.props.data.me)
      return (
        <GetAllConfs
          id={this.props.data.me.id}
          handleCloseConference={this.props.handleCloseConference}
        />
      );
    else return <Loading />;
  }
}

export default compose(graphql(ME_QUERY))(ConfMgtSidebar);
