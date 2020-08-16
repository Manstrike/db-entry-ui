import React from 'react';
import './app.component.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { AdminPanel } from './pages/admin-panel/admin.component';
import { School } from './pages/school/school.component';
import  Teacher  from './pages/teacher/teacher.component';

export class App extends React.Component{
    constructor() {
        super();

        this.state = {
            redirect: false,
        };

        this._handleSignInButtonClicked = this._handleSignInButtonClicked.bind(this); 
    }

    _handleSignInButtonClicked(userCredentials, fetchedUser) {
        const {login, password} = userCredentials;
        
        localStorage.setItem('user', JSON.stringify(fetchedUser));
        this.setState({
            redirect: password === fetchedUser.password && login === fetchedUser.name,
            user: fetchedUser
        });
    }

    render() {
        const { redirect } = this.state;
        const { history } = this.props;

        if (redirect) {
            return (
                <div className="App">
                <Switch>
                    <Redirect exact from='/' to='/home' push/>
                    <Route exact path='/'>
                        <LoginPage history={history} location={this.props.location} onClick={this._handleSignInButtonClicked}/>
                    </Route>
                    <Route exact path='/home'>
                        <Home history={history} user={this.state.fetchedUser}/>
                    </Route>
                    <Route exact path='/admin'>
                        <AdminPanel history={history}/>
                    </Route>
                    <Route path='/school/create'>
                        <School history={history}/>
                    </Route>
                    <Route path='/teacher/create'>
                        <Teacher history={history} />
                    </Route>
                </Switch>
            </div>
            )
        }

        return (
            <div className="App">
                <Switch>
                    <Route exact path='/'>
                        <LoginPage history={history} onClick={this._handleSignInButtonClicked}/>
                    </Route>
                    {redirect && <Redirect to='/home' />}
                    <Route exact path='/home'>
                        <Home history={history} />
                    </Route>
                    <Route exact path='/admin'>
                        <AdminPanel history={history} />
                    </Route>
                    <Route path='/school/create'>
                        <School history={history} />
                    </Route>
                    <Route path='/teacher/create'>
                        <Teacher history={history} />
                    </Route>
                </Switch>
            </div>
        );
    }
}
