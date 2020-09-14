import React from 'react';
import './school-list.component.css';

import { SchoolListTable } from './school-list-table/school-list-table.component';

export class SchoolList extends React.Component {
    render() {
        const { entries } = this.props;

        return (
            <div className='entry-list-wrapper'>
                {entries.length > 0 
                    ? (
                        <SchoolListTable entries={entries}/>
                    ) 
                    : (
                        <p className='no-schools-entered'>Kanton has no schools entered</p>
                    )
                }
            </div>
        );
    }
}