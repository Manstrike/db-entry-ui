import React from 'react';
import { ListItem, ListItemText, Collapse } from '@material-ui/core';
import { BuildingsList } from './buildings-list.component';
import { Link } from 'react-router-dom';


import { nanoid } from 'nanoid';

export class SchoolItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _handleClick(event) {
        this.setState({
            [event] : !this.state[event],
        });
    }

    render() {
        const { school } = this.props;
        console.log({school});
        return (
            <div key={nanoid()}>
                <ListItem>
                    <ListItemText
                        primary={school.name}
                    >

                    </ListItemText>
                </ListItem>
            </div>
        )
    }
}
