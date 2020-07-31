import React from 'react';
import './app.component.css';

import { Route, Switch } from 'react-router-dom';
import { LoginPage } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { AdminPanel } from './pages/admin-panel/admin.component';

export class App extends React.Component{
    constructor() {
        super();

        this._handleSignInButtonClicked = this._handleSignInButtonClicked.bind(this); 
    }

    _handleSignInButtonClicked(event) {
        event.preventDefault();
    }

    render() {
        const { history } = this.props;
        return (
            <div className="App">
                <Switch>
                    <Route exact path='/'>
                        <LoginPage history={history} onClick={this._handleSignInButtonClicked}/>
                    </Route>
                    <Route exact path='/home'>
                        <Home history={history}/>
                    </Route>
                    <Route exact path='/admin'>
                        <AdminPanel history={history}/>
                    </Route>
                    <Route path='/school/create'>

                    </Route>
                    <Route path='/teacher/create'>

                    </Route>
                </Switch>
            </div>
        );
    }
}
