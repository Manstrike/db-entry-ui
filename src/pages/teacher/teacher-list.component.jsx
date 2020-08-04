import React from 'react';
import queryString from 'query-string';
import { config } from '../../config';

import { withRouter } from 'react-router-dom';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class TeacherList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
        };
        this._onClick = props.onClick;
    }
    
    componentWillMount() {
        const { school, building} = queryString.parse(this.props.location.search);

        const route = building 
            ? `${config.API}/teacher/building/${school}/${building}`
            : `${config.API}/teacher/school/${school}`;
        
        fetch(route)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    entries: [...result]
                });

                //this._fetchSchoolInfo(school);
            });
    }

    _handleTeacherClick(item) {
        this._onClick(item);
    }

    render() {
        const { entries } = this.state;

        return (
            <div className='entry-list'>
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
        )
    }
}

export default withRouter(TeacherList);
