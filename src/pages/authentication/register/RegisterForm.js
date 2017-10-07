import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { regex } from '../../../utils';
import './RegisterForm.css';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'confirmPassword',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required!';
    }
  });
  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = 'Password does not match!';
  }
  if (values.password && !regex.passwordRegex.test(values.password)) {
    errors.password =
      'Password must contains at least 6 character include number and special character ';
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
    {...custom}
    className={className}
  />
);

const RegisterForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="register-field">
      <Field
        className="subname reduxField"
        name="firstName"
        component={renderField}
        label="First Name"
      />
      <Field
        className="subname reduxField"
        name="lastName"
        component={renderField}
        label="Last Name"
      />
    </div>
    <div className="register-field">
      <Field
        name="email"
        component={renderField}
        label="Email"
        className="reduxField"
      />
    </div>
    <div className="register-field">
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        className="reduxField"
      />
    </div>
    <div className="register-field">
      <Field
        name="confirmPassword"
        type="password"
        component={renderField}
        label="Confirm Password"
        className="reduxField"
      />
    </div>
    <div>
      <RaisedButton
        className="btn register"
        disabled={submitting || invalid || pristine}
        type="submit"
        label="Create Account"
        labelPosition="before"
        primary={true}
      />
    </div>
  </form>
);

export default reduxForm({
  form: 'RegisterForm',
  validate,
})(RegisterForm);
