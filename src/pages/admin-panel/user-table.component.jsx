import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class UserTable extends React.Component {
    render() {
        return (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell >Password</TableCell>
                    <TableCell>Total Entries</TableCell>
                    <TableCell align="right">Total worked (hours)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{user.name}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>{user.entered}</TableCell>
                      <TableCell align="right">{
                      user.worked_total ? user.worked_total.toFixed(2) : 0
                      }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
    }
}
