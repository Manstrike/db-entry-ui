import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {nanoid} from 'nanoid';

export class BuildingsList extends React.Component {
    render() {
        const { items, schoolId } = this.props;
        return (
            <List
                disablePadding
                className='entry-item'
                margin='normal'
                key={nanoid()}
            >
                {items.map((item) => {
                    return (
                        <ListItem
                            button
                            key={nanoid()}
                            component={Link}
                            to={`/teacher/create?building=${item.id}&school=${schoolId}`} 
                        >
                            <ListItemText primary={item.building_name} />
                        </ListItem>
                    )
                })}
            </List>
        );
    }
}
