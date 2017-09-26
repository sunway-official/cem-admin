import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { RaisedButton, Subheader } from 'material-ui';
import { TextField, DatePicker } from 'redux-form-material-ui';
import { style } from './style.css';
import normalizePhone from './normalizePhone';

const renderCoOrganizers = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((data, index) => (
      <div key={index}>
        <div className="d-flex group remove-btn">
          <span>Co-Organizer #{index + 1 + 1}</span>
          <RaisedButton label="Remove" onClick={() => fields.remove(index)} />
        </div>
        <div className="d-flex form-group">
          <label>Name :</label>
          <Field
            name={`${data}.coOrganizerName`}
            component={TextField}
            validate={required}
            hintText="Organizer Name"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Email :</label>
          <Field
            name={`${data}.coOrganizerEmail`}
            component={TextField}
            validate={required}
            hintText="Organizer Email"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Website :</label>
          <Field
            name={`${data}.coOrganizerWebsite`}
            component={TextField}
            validate={required}
            hintText="Organizer Website"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Phone Number :</label>
          <Field
            name={`${data}.coOrganizerPhoneNumber`}
            component={TextField}
            validate={required}
            hintText="Organizer Phone Number"
            fullWidth={true}
            normalize={normalizePhone}
          />
        </div>
      </div>
    ))}
    <div className="d-flex add-btn btn-group">
      <RaisedButton
        label="Add"
        primary={true}
        onClick={() => fields.push({})}
      />
    </div>
  </div>
);
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;
class Info extends Component {
  render() {
    const { handleSubmit, submitting, hasCoOrganizerValue } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <Subheader className="header title">Basic Information</Subheader>
            <div>
              <div className="d-flex form-group">
                <label>Topic :</label>
                <Field
                  name="topic"
                  component={TextField}
                  validate={required}
                  hintText="Conference Topic"
                  fullWidth={true}
                />
              </div>
              <div className="d-flex form-group">
                <label>Description :</label>
                <Field
                  name="description"
                  component={TextField}
                  validate={required}
                  hintText="Conference Description"
                  multiLine
                  rows={1}
                  fullWidth={true}
                />
              </div>
              <div className="d-flex date">
                <div className="d-flex form-group">
                  <label className="start">Conference Start From :</label>
                  <Field
                    name="startDate"
                    component={DatePicker}
                    validate={required}
                    format={null}
                    textFieldStyle={{ width: '100%' }}
                    hintText="Start Date"
                  />
                </div>
                <div className="d-flex form-group">
                  <label className="end">To :</label>
                  <Field
                    name="endtDate"
                    component={DatePicker}
                    validate={required}
                    format={null}
                    textFieldStyle={{ width: '100%' }}
                    hintText="End Date"
                  />
                </div>
              </div>
            </div>
            <Subheader className="header title">
              Organizer Information
            </Subheader>
            <div>
              <div className="d-flex form-group">
                <label>Name :</label>
                <Field
                  name="organizerName"
                  component={TextField}
                  validate={required}
                  hintText="Organizer Name"
                  fullWidth={true}
                />
              </div>
              <div className="d-flex form-group">
                <label>Email :</label>
                <Field
                  name="organizerMail"
                  component={TextField}
                  validate={[required, email]}
                  hintText="Organizer Email"
                  fullWidth={true}
                />
              </div>
              <div className="d-flex form-group">
                <label>Website :</label>
                <Field
                  name="organizerWebsite"
                  component={TextField}
                  validate={required}
                  hintText="Organizer Website"
                  fullWidth={true}
                />
              </div>
              <div className="d-flex form-group">
                <label>Phone Number :</label>
                <Field
                  name="organizerPhoneNumber"
                  component={TextField}
                  validate={required}
                  hintText="Organizer Phone Number"
                  fullWidth={true}
                  normalize={normalizePhone}
                />
              </div>
            </div>
            <div>
              <Subheader className="header title" htmlFor="hasCoOrganizer">
                Co-Organizer
              </Subheader>
              <div>
                <Field
                  name="hasCoOrganizer"
                  id="hasCoOrganizer"
                  type="checkbox"
                  component="input"
                />
              </div>
              {hasCoOrganizerValue && (
                <div>
                  <div className="d-flex form-group">
                    <label>Name :</label>
                    <Field
                      name="coOrganizerName"
                      component={TextField}
                      hintText="Co-Organizer Name"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Email :</label>
                    <Field
                      name="coOrganizerMail"
                      component={TextField}
                      validate={[required, email]}
                      hintText="Organizer Email"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Website :</label>
                    <Field
                      name="coOrganizerWebsite"
                      component={TextField}
                      validate={required}
                      hintText="Organizer Website"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Phone Number :</label>
                    <Field
                      name="coOrganizerPhoneNumber"
                      component={TextField}
                      validate={required}
                      hintText="Organizer Phone Number"
                      fullWidth={true}
                      normalize={normalizePhone}
                    />
                  </div>
                  <FieldArray
                    name="coOrganizers"
                    component={renderCoOrganizers}
                  />
                </div>
              )}
              <div className="d-flex save-btn btn-group">
                <RaisedButton
                  label="Save"
                  primary={true}
                  type="submit"
                  disabled={submitting}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const selector = formValueSelector('conferenceInfo');

Info = reduxForm({
  form: 'conferenceInfo',
  initialValues: {},
})(Info);

Info = connect(state => {
  const hasCoOrganizerValue = selector(state, 'hasCoOrganizer');
  return {
    hasCoOrganizerValue,
  };
})(Info);

export default Info;
