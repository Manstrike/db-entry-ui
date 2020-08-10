import React from 'react';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export class TeacherList extends React.Component {
    constructor(props) {
        super(props);

        this._onClick = props.onClick;
    }
    
    _handleTeacherClick(item) {
        this._onClick(item);
    }

    render() {
        const { entries, school } = this.props;

        return (
            <div className='entry-list-wrapper'> 
                <h2>{school ? `${school.community}, ${school.city} - ${school.level}` : ''}</h2>
                <div>
                    <List>
                        {entries.map((item) => {
                            return (
                                <div key={item.id}>
                                    <ListItem
                                        button
                                        onClick={this._handleTeacherClick.bind(this, item)}
                                        key={item.id}
                                    >
                                        <ListItemText primary={`${item.firstName} ${item.secondName}`}/>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                </div>
            </div>
        );
    }
}
