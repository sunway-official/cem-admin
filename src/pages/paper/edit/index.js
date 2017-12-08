import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import Form from './form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  async handleSave(values) {
    const { UPDATE_PAPER, UPDATE_TOPIC_OF_PAPER } = this.props;
    try {
      await UPDATE_PAPER({
        variables: {
          id: values.id,
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
        },
        refetchQueries: [
          {
            query: queries.GET_PAPERS_BY_CONFERENCE_ID,
          },
        ],
      });
      await UPDATE_TOPIC_OF_PAPER({
        variables: {
          paper_id: values.id,
          topic_id: this.props.topic.id,
        },
        refetchQueries: [
          {
            query: queries.GET_TOPICS_BY_PAPER_ID,
            variables: {
              paper_id: values.id,
            },
          },
        ],
      });
      this.props.history.replace('/conference/papers');
    } catch (error) {
      throw console.log({ error });
    }
  }
  render() {
    console.log(this.props.topic);
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    const loadingTopics = this.props.GET_TOPICS_OF_CONFERENCE.loading;
    const loadingPaperTopics = this.props.GET_TOPICS_BY_PAPER_ID.loading;
    const { getPaperByID } = this.props.GET_PAPER_BY_ID;
    const { getTopicsOfConference } = this.props.GET_TOPICS_OF_CONFERENCE;
    const { getTopicsByPaperID } = this.props.GET_TOPICS_BY_PAPER_ID;
    if (loadingPaper || loadingTopics || loadingPaperTopics)
      return <div>Loading...</div>;
    let paper, topics, paperTopicsActive, initialValues;
    if (getTopicsByPaperID) {
      paperTopicsActive = getTopicsByPaperID;
    }
    if (getTopicsOfConference) {
      topics = getTopicsOfConference;
    }
    if (getPaperByID) {
      paper = getPaperByID;
      initialValues = {
        id: paper.id,
        title: paper.title,
        abstract: paper.abstract,
        keywords: paper.keywords,
        topic: paperTopicsActive[0].topic.id,
      };
    }
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
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
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Paper Management</span>
        </div>
        <div className="dashboard content d-flex">
          <Form
            initialValues={initialValues}
            onSubmit={this.handleSave}
            topics={topics}
            paperTopicsActive={paperTopicsActive[0].topic.name}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state) {
    return {
      topic: state.topics.data,
    };
  }
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.GET_TOPICS_BY_PAPER_ID, {
    name: 'GET_TOPICS_BY_PAPER_ID',
    options: ownProps => ({
      variables: {
        paper_id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(mutations.UPDATE_PAPER, {
    name: 'UPDATE_PAPER',
  }),
  graphql(mutations.UPDATE_TOPIC_OF_PAPER, {
    name: 'UPDATE_TOPIC_OF_PAPER',
  }),
)(Index);