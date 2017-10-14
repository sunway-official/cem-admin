import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../store/ducks/auth';

class AuthRoute extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.error) {
      localStorage.clear();
    }
    if (nextProps.data.me) {
      this.props.setCurrentUser(nextProps.data.me);
    }
  }
  render() {
    const {
      component: Component,
      needAuth,
      needGuest,
      data: { loading, error },
      ...rest
    } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }

    if (error && needAuth) {
      return <Route {...rest} render={props => <Redirect to="/login" />} />;
    }

    if (!error && needGuest) {
      return <Route {...rest} render={props => <Redirect to="/" />} />;
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

AuthRoute.propTypes = {
  needAuth: PropTypes.bool,
  needGuest: PropTypes.bool,
};

AuthRoute.defaultProps = {
  needAuth: false,
  needGuest: false,
};

const ME_QUERY = gql`
  query Me {
    me {
      id
      firstname
      lastname
      gender
      email
      bio
      dob
      linkedin_id
      facebook_id
      twitter_id
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  setCurrentUser: bindActionCreators(authActions.setCurrentUser, dispatch),
});

export default compose(
  graphql(ME_QUERY, {
    options: {
      notifyOnNetworkStatusChange: true,
    },
  }),
  connect(null, mapDispatchToProps),
)(AuthRoute);
