import React from 'react';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import { Link } from 'react-router-dom';

export class SchoolList extends React.Component {
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
        const entries = this.props.entries;
        return (
            <div className='entry-list'>
                <List>
                    {entries.map((item) => {
                        return (
                            <div key={item.id}>
                                {item.buildingsList.length > 0 
                                    ? (
                                        <div key={item.id}>
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={
                                                    this._handleClick.bind(this, item.name)
                                                }
                                            >
                                                <ListItemText primary={item.name} />
                                            </ListItem>

                                            <Collapse
                                                key={item.id}
                                                component='li'
                                                in={this.state[item.name]}
                                                timeput='auto'
                                                unmountOnExit
                                            >
                                                <List 
                                                    disablePadding
                                                    className='entry-item'
                                                    margin='normal'
                                                >
                                                    {item.buildingsList.map(subitem => {
                                                        return (
                                                            <ListItem
                                                                button
                                                                component={Link}
                                                                to={`/teacher/create?building=${subitem.id}&school=${item.id}`} 
                                                                key={subitem.id}
                                                            >
                                                                <ListItemText 
                                                                    key={subitem.id} 
                                                                    primary={subitem.name} 
                                                                />
                                                            </ListItem>
                                                        )
                                                    })}
                                                </List>
                                            </Collapse>
                                        </div>
                                    ) : (
                                        <ListItem
                                            button
                                            component={Link}
                                            to={`/teacher/create?school=${item.id}`}
                                            key={item.id}
                                        >
                                            <ListItemText primary={item.name}/>
                                        </ListItem>
                                    )}

                            </div>
                        );
                    })}
                </List>
            </div>
        )
    }
}