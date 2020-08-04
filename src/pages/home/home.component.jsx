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
        fetch(`${config.API}/school/all`)
            .then(response => response.json())
            .then(result => {
                const entries = result.map((item, i) => {
                    return {
                        ...item,
                        name: `${item.community}, ${item.city} - ${item.level}`,
                    };
                });
                this.setState({
                    entries: [...entries]
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
