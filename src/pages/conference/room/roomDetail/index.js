import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import { queries as scheduleQueries } from '../../../schedule/helpers';
import RoomDetail from './roomDetail';
import { connect } from 'react-redux';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.saveInformation = this.saveInformation.bind(this);
  }
  saveInformation(values) {
    const { UPDATE_ROOM_MUTATION } = this.props;
    UPDATE_ROOM_MUTATION({
      variables: {
        id: values.id,
        conference_id: this.props.id,
        name: values.name,
        seats: values.seats,
        status: values.status,
      },
      refetchQueries: [
        {
          query: queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY,
        },
        {
          query: scheduleQueries.GET_ROOMS_BY_STATUS_QUERY,
          variables: { status: 'on' },
        },
      ],
    });
    window.alert('success');
  }
  render() {
    const { loading, getRoomByID } = this.props.GET_ROOM_BY_ID_QUERY;
    if (loading) return <div>loading</div>;
    const roomDetail = getRoomByID;
    return (
      <div className="conference">
        <Subheader className="subheader">Room Detail</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link className="d-flex" to="/conference/rooms-management">
            <span>Rooms Management</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Room Detail</span>
        </div>
        <div className="dashboard content d-flex">
          <RoomDetail roomDetail={roomDetail} onSubmit={this.saveInformation} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if (state.auth.currentUser && state.auth.currentUser.currentConference) {
    return {
      id: state.auth.currentUser.currentConference.id,
    };
  }
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(queries.GET_ROOM_BY_ID_QUERY, {
    options: ownProps => ({
      variables: { id: ownProps.match.params.room_id },
    }),
    name: 'GET_ROOM_BY_ID_QUERY',
  }),
  graphql(mutations.UPDATE_ROOM_MUTATION, {
    name: 'UPDATE_ROOM_MUTATION',
  }),
)(Index);