import React from 'react';
import {nanoid} from 'nanoid';
import { ListItem, ListItemText, Collapse } from '@material-ui/core';

import { SchoolItem } from './school-item.component';

export class Canton extends React.Component {
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
        const { item, history } = this.props;
        return (
            <div key={nanoid()}>
                <div className='canton-item'>
                    <ListItem
                        button
                        key={nanoid()}
                        onClick={this._handleClick.bind(this, item.community.name)}
                    >
                        <ListItemText primary={`${item.community.name} (${item.schools.length} schools)`}/>
                    </ListItem>
                </div>
                <Collapse
                    key={nanoid()}
                    component='li'
                    in={this.state[item.community.name]}
                    timeput='auto'
                    unmountOnExit
                >
                    {item.schools.map(school => {
                        return (
                            <SchoolItem key={nanoid()} school={school} history={history}/>
                        );
                    })}
                </Collapse>
            </div>
        )
    }
}
