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
        return (
            <div key={nanoid()}>
                {school.buildingsList.length > 0 
                ? (
                    <div key={nanoid()}>
                        <ListItem
                            button
                            key={nanoid()}
                            onClick={this._handleClick.bind(this, school.name)}
                        >
                            <ListItemText primary={`${school.name} (${school.buildingsList.length} buildings)`}/>
                            <Link
                                to={`/school/create?id=${school.id}`}
                            >
                                Edit
                            </Link>
                        </ListItem>
                        <Collapse
                            key={nanoid()}
                            component='div'
                            in={this.state[school.name]}
                            timeput='auto'
                            unmountOnExit
                        >
                            <BuildingsList 
                                key={nanoid()}
                                items={school.buildingsList} 
                                schoolId={school.id} 
                            />
                        </Collapse>
                    </div>
                )
                : (
                    <ListItem
                        button
                        component={Link}
                        to={`/teacher/create?school=${school.id}`}
                        key={nanoid()}
                    >
                        <ListItemText primary={`${school.name} (No buildings)`}/>
                    </ListItem>
                )}
            </div>
        )
    }
}
