import React from 'react';

import './home.component.css';
import { config } from '../../config';

import { Menu } from './menu.component';
import { SchoolList } from './school-list.component';


export class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
        }
    }

    componentDidMount() {
        this._fetchSchools();
    }

    _fetchSchools() {
        let schools;

        fetch(`${config.API}/school/all`)
            .then(response => response.json())
            .then(result => {
                schools = result;
                return fetch(`${config.API}/school/communities`)
            })
            .then(response => response.json())
            .then(communities => {
                schools = schools.map((item, i) => {
                    const community = communities.find(comm => comm.id === item.community);
                    return {
                        ...item,
                        name: `${community.name}, ${item.city} - ${item.level}`,
                    };
                });

                this.setState({
                    entries: [...schools]
                });
            });
    }


    render() {
        const { history } = this.props;
        const { entries } = this.state;

        return (
            <div className="home-page">
                <SchoolList entries={entries}/>
                <Menu history={history}/>
            </div>  
        );
    }
}
