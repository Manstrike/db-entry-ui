import React from 'react';

import './home.component.css';
import { config } from '../../config';
import { GetSelectedKanton } from '../../utils/kantonInfo';

import { SchoolProvider } from '../../httpProviders/SchoolProvider';

import { Menu } from './menu.component';
import { SchoolList } from './school-list/school-list.component';
import { NoKantonSelected } from './no-kanton-selected/no-kanton-selected.component';

export class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            kanton: null,
            user: props.user,
            entries: [],
        }
    }

    componentDidMount() {
        const currentKanton = localStorage.getItem('kanton');
        let schoolList = [];
        if (currentKanton) {
            schoolList = SchoolProvider.getSchoolsByKanton(currentKanton);
        }

        this.setState({
            kanton: currentKanton || null,
            schoolList
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
        const kantonSelected = GetSelectedKanton();
        console.log({kantonSelected})
        return (
            <div className="home-page">
                {kantonSelected
                    ? (
                        <React.Fragment>
                            <SchoolList history={history} entries={entries}/>
                            <Menu 
                                history={history}
                                onClickStart={this.onClickStart} 
                                onClickFinish={this.onClickFinish}
                            />
                        </React.Fragment>
                    ) 
                    : (
                        <React.Fragment>
                            <NoKantonSelected />
                        </React.Fragment>
                    )
                }
            </div>  
        );
    }
}

/**
 * 
 */