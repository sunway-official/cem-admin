import { gql } from 'react-apollo';

const GET_CURRENT_CONFERENCE = gql`
  query getCurrentConference {
    getCurrentConference {
      id
      title
      start_date
      end_date
      category_id
      category_name
      dl_submit_abstract
      dl_review_abstract
      dl_release_abstract
      dl_re_submit_abstract
      dl_re_review_abstract
      dl_release_final_abstract
      dl_submit_paper
      dl_review_paper
      dl_release_paper
      dl_re_submit_paper
      dl_re_review_paper
      dl_release_final_paper
      dl_registration
      address {
        id
        lat
        long
      }
      organizerDetail {
        id
        name
        email
        address
        website
        phone
      }
      coOrganizerDetails {
        id
        name
        email
        website
        phone
        conference {
          id
        }
      }
    }
  }
`;
const GET_CONFERENCE_BY_ID_QUERY = gql`
  query getConferenceByID($id: ID!) {
    getConferenceByID(id: $id) {
      id
      title
      description
      start_date
      end_date
      address {
        id
        lat
        long
      }
      organizerDetail {
        id
        name
        email
        website
        address
        phone
      }
      coOrganizerDetails {
        id
        name
        email
        website
        phone
        conference {
          id
        }
      }
    }
  }
`;
const GET_CO_ORGANIZER_DETAIL_BY_ID = gql`
  query getCoOrganizerDetailByID($id: ID!) {
    getCoOrganizerDetailByID(id: $id) {
      id
      name
      email
      website
      phone
    }
  }
`;
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
      avatar
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
      currentConference {
        id
        title
        description
        start_date
        end_date
        address {
          id
          lat
          long
        }
        organizerDetail {
          id
          name
          email
          website
          phone
          address
        }
      }
    }
  }
`;

export const GET_ALL_ROLE_OF_USER = gql`
  query getAllRolesOfUser {
    getAllRolesOfUser {
      role {
        id
      }
    }
  }
`;
export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
      conferences {
        id
        title
        start_date
        end_date
      }
    }
  }
`;
export const GET_PAPERS_BY_CONFERENCE_ID = gql`
  query getPapersByConferenceID($role_id: ID!) {
    getPapersByConferenceID(role_id: $role_id) {
      id
      title
      reviewers {
        reviewer_name
      }
      authors {
        author_name
      }
      topic_name
      status
      comments {
        id
        point
        reviewer_name
        review_question_id
        content
        comment
      }
      is_reviewed
    }
  }
`;

export default {
  GET_PAPERS_BY_CONFERENCE_ID,
  ME_QUERY,
  GET_CURRENT_CONFERENCE,
  GET_CONFERENCE_BY_ID_QUERY,
  GET_ALL_ROLE_OF_USER,
  GET_CO_ORGANIZER_DETAIL_BY_ID,
  GET_ALL_CATEGORIES,
};
