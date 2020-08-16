import React from 'react';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InfiniteScroll from 'react-infinite-scroll-component';

import { nanoid } from 'nanoid';

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
                    <InfiniteScroll
                        dataLength={entries.length} //This is important field to render the next data
                        hasMore={false}
                        loader={<h4>Loading...</h4>}
                    >
                        {entries.map((item) => {
                            return (
                                <div key={nanoid()}>
                                    <ListItem
                                        button
                                        onClick={this._handleTeacherClick.bind(this, item)}
                                        key={nanoid()}
                                    >
                                        <ListItemText primary={`[${item.gender}] ${item.firstName} ${item.secondName}`}/>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
