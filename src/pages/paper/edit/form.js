import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import { reduxForm, Field } from 'redux-form';
import validate from '../validate';
import { RaisedButton, Subheader, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import { topicsActions } from 'store/ducks/topics';
import { connect } from 'react-redux';

class EditPaperForm extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(topic) {
    this.props.setTopic(topic);
  }
  render() {
    const topics = this.props.topics;
    const { handleSubmit, invalid } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <Subheader className="subheader">Paper Information</Subheader>
        <div className="d-flex form-group">
          <label>Title :</label>
          <Field
            name="title"
            component={CustomInput}
            fullWidth={true}
            hintText="Paper Title"
          />
        </div>
        <div className="d-flex form-group">
          <label>Abstract :</label>
          <Field
            name="abstract"
            component={CustomInput}
            fullWidth={true}
            multiLine
            rows={1}
            hintText="Paper Abstract"
          />
        </div>
        <div className="d-flex form-group">
          <label>Keywords :</label>
          <Field
            name="keywords"
            component={CustomInput}
            fullWidth={true}
            multiLine
            rows={1}
            hintText="Paper Abstract"
          />
        </div>
        <div className="d-flex form-group">
          <label>Topic :</label>
          <Field
            name="topic"
            component={renderSelectField}
            hintText="Paper Topic"
            fullWidth={true}
          >
            {topics.map(topic => {
              return (
                <MenuItem
                  key={topic.id}
                  value={topic.id}
                  primaryText={topic.name}
                  onClick={() => {
                    this.handleClick(topic);
                  }}
                />
              );
            })}
          </Field>
        </div>
        <div
          style={{ marginBottom: '20px' }}
          className="d-flex save-btn btn-group"
        >
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            onClick={() => {
              if (!invalid) {
                alert('Saved');
              }
            }}
          />
          <RaisedButton
            label="Cancel"
            style={{ marginLeft: '10px' }}
            containerElement={<Link to="/conference/papers" />}
          />
        </div>
      </form>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setTopic: topic => dispatch(topicsActions.setTopics(topic)),
  };
};
EditPaperForm = connect(undefined, mapDispatchToProps)(EditPaperForm);
export default reduxForm({
  form: 'EditPaperForm',
  validate,
})(EditPaperForm);