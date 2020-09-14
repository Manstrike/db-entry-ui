import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { SchoolListTableHeader } from './school-list-table-header.component';
import './school-list-table.component.css';
import { SchoolListTablePagination } from './school-list-table-pagination';

export function SchoolListTable(props) {
    const { entries } = props;

    return (
        <div className='school-list-container'>
            <TableContainer>
                <Table
                    className='school-list-table'
                    aria-aria-labelledby='tableTitle'
                    size='medium'
                    aria-label='enchanced table'
                >
                    <SchoolListTableHeader />
                    <TableBody>
                        {entries.map((item) => (
                            <TableRow
                                hover
                                key={item.name}
                            >
                                <TableCell
                                    component='th'
                                    scope='row'
                                    padding='none'
                                >
                                    {item.name}
                                </TableCell>
                                <TableCell align='left' component='xs'>{item.buildingsCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <SchoolListTablePagination 
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        page={0}
                        rowsPerPage={3}
                        rowsCount={entries.length}
                    />
                </Table>
            </TableContainer>
        </div>
    );
}

function handleChangePage() {

}

function handleChangeRowsPerPage() {

}
