import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { GET_ALL_STAFF_IN_CONFERENCE } from './index';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  Dialog,
} from 'material-ui';
import Status from './status';
import Action from './action';
import { style } from './style.css';
// import Add from './add';

class Index extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }
  state = {
    openDelete: false,
    staff: {},
  };
  handleOpenDelete = UserId => {
    this.setState({ openDelete: true });
    this.setState({
      UserId: UserId,
    });
  };
  handleClose = () => {
    this.setState({ openDelete: false });
  };
  delete() {
    this.setState({ openDelete: false });
    const { DELETE_USER } = this.props;
    DELETE_USER({
      variables: {
        id: this.state.UserId,
      },
      update: (store, { data: { deleteUser } }) => {
        const data = store.readQuery({
          query: GET_ALL_STAFF_IN_CONFERENCE,
        });
        data.getAllStaffInConference = this.state.staff.filter(
          item => item !== this.state.staff,
        );
        store.writeQuery({ query: GET_ALL_STAFF_IN_CONFERENCE, data });
      },
    });
  }
  render() {
    const allStaff = this.props.allStaff;
    const staffRole = this.props.staffRole;
    console.log(staffRole);
    const actionDelete = [
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
        type="submit"
      />,
      <RaisedButton label="Cancel" onClick={this.handleClose} />,
    ];
    return (
      <div className="d-flex">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="list staff">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>No.</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {allStaff.map((staff, index) => (
                <TableRow key={staff.id}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>
                    {staff.firstname} {staff.lastname}
                  </TableRowColumn>
                  <TableRowColumn>{staff.email}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="delete"
                      onClick={() => this.handleOpenDelete(staff.id)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            title="Do you want to delete this staff?"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={actionDelete}
          />
        </div>
      </div>
    );
  }
}
const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
export default graphql(DELETE_USER, {
  name: 'DELETE_USER',
})(Index);
