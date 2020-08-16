import React from 'react';
import List from "@material-ui/core/List";

import { Canton } from './canton-item.component';
import { nanoid } from 'nanoid';
import { Typography } from '@material-ui/core';

export class SchoolList extends React.Component {
    render() {
        const {entries, history} = this.props;

        return (
            <div className='entry-list-wrapper'>
                <Typography>SCHOOL LIST</Typography>
                <List>
                    {entries.map((item) => {
                        return (
                            <Canton key={nanoid()} item={item} history={history}/>
                        );
                    })}
                </List>
            </div>
        )
    }
}