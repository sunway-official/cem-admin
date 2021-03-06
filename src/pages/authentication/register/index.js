import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { AppBar } from 'material-ui';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import './style.css';
import { mutations } from '../helpers';
import {
  alertOptions,
  MyExclamationTriangle,
  MyFaCheck,
} from '../../../theme/alert';
import AlertContainer from 'react-alert';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      conference_id: 0,
    };
    this.onRegister = this.onRegister.bind(this);
    this.showAlertError = this.showAlertError.bind(this);
    this.showAlertSuccess = this.showAlertSuccess.bind(this);
  }
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  showAlertSuccess = isAuthor => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        if (isAuthor) {
          this.props.history.replace('/login');
        } else {
          let link = '/landingpage/';
          link = link.concat(this.props.conference_id);
          this.props.history.replace(link);
        }
      },
    });
  };
  async onRegister(values) {
    const { firstname, lastname, email, password } = values;
    try {
      const user = await this.props.registerMutation({
        variables: { firstname, lastname, email, password },
      });
      //await console.log(user.data.register.id);
      await this.props.insertConferenceAttendee({
        variables: {
          conference_id: this.props.conference_id,
          user_id: user.data.register.id,
        },
      });
      if (values.author) {
        await this.props.updateUserRoleStatus({
          variables: {
            role_id: 7,
            user_id: user.data.register.id,
            conference_id: this.props.conference_id,
            status: 'on',
          },
        });
      }
      this.showAlertSuccess(values.author ? true : false);
    } catch (error) {
      this.showAlertError(error.graphQLErrors[0].message);
      throw new SubmissionError({
        _error: 'Email existed!',
      });
    }
  }
  render() {
    return (
      <div className="register-body">
        <div className="card" id="register-form-container">
          <div className="card-content">
            <AppBar
              className="register-title"
              title="REGISTER"
              showMenuIconButton={false}
            />
            <RegisterForm onSubmit={this.onRegister} />
            <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (localStorage.getItem('conference_id')) {
    return {
      conference_id: localStorage.getItem('conference_id'),
    };
  }
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(mutations.REGISTER_MUTATION, { name: 'registerMutation' }),
  graphql(mutations.INSERT_CONFERENCE_ATTENDEE_MUTATION, {
    name: 'insertConferenceAttendee',
  }),
  graphql(mutations.UPDATE_USER_ROLE_STATUS_MUTATION, {
    name: 'updateUserRoleStatus',
  }),
  withRouter,
)(Register);
