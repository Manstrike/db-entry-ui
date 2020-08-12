import React from 'react';

import './home.component.css';
import { config } from '../../config';

import { Menu } from './menu.component';
import { SchoolList } from './school-list.component';


export class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
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

    onClickFinish() {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        fetch(`${config.API}/user/time/finish`, {
            method: 'POST',
            body: JSON.stringify({
                userId: savedUser.id || this.state.user.id,
                finishTime: new Date(),
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(response => console.log(response));
    }

    onClickStart() {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const data = {
            userId: savedUser.id || this.state.user.id,
            startTime: new Date(),
        };

        fetch(`${config.API}/user/time/start`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json'
            }
        })
            .then((res) => res.json())
            .then(response => console.log(response));
    }

    render() {
        const { history } = this.props;
        const { entries } = this.state;

        return (
            <div className="home-page">
                <SchoolList entries={entries}/>
                <Menu 
                    history={history} 
                    onClickStart={this.onClickStart} 
                    onClickFinish={this.onClickFinish}
                />
            </div>  
        );
    }
}
