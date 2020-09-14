import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import { TableCell, TableRow } from '@material-ui/core';

export function SchoolListTableHeader(props) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((cell) => (
                    <TableCell
                        key={cell.id}
                        align='left'
                        padding={cell.disablePadding ? 'none' : 'default'}
                        className='table-header'
                    >
                        {cell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const headCells = [
    { id: 'school-name', numeric: false, label: 'School name', disablePadding: false },
    { id: 'school-buildings', numeric: true, label: 'School name',  disablePadding: false }
];
