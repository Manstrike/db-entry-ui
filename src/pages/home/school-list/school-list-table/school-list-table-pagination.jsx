import React from 'react';

import { TablePagination } from '@material-ui/core';

export function SchoolListTablePagination(props) {
    const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage, rowsCount } = props;

    return (
        <TablePagination
            className='table-pagination'
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rowsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}
