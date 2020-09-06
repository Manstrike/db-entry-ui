import React from 'react';
import './app.component.css';
import { authentificate, isAuthentificated, hasRole } from './utils/auth';
import { config } from '../src/config';

import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { AdminPanel } from './pages/admin-panel/admin.component';
import { School } from './pages/school/school.component';
import  Teacher  from './pages/teacher/teacher.component';
import { Header } from './pages/shared/header/header.component';

export class App extends React.Component{
    constructor() {
        super();

        this.state = {
            redirect: false,
            kantonList: []
        };

        this._handleSignInButtonClicked = this._handleSignInButtonClicked.bind(this);
        this._handleKantonSelect = this._handleKantonSelect.bind(this);
    }

    componentDidMount() {
        this._fetchCommunities();
    }

    _fetchCommunities() {
        fetch(`${config.API}/school/communities`)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    kantonList: result
                });
        });
    }

    _handleSignInButtonClicked(userCredentials, fetchedUser) {
        const {login, password } = userCredentials;

        if (password === fetchedUser.password && login === fetchedUser.name) {
            authentificate(JSON.stringify(fetchedUser));
            this.setState({
                user: fetchedUser
            });
        }
    }

    _handleKantonSelect(event) {
        console.log(event.target.value)
        localStorage.setItem('kanton', event.target.value || null);
    }

    render() {
        const { history } = this.props;
        const { user, kantonList } = this.state;
        const isAuth = isAuthentificated(user);

        if (isAuth) {
            return (
                <div className="App">
                    <Header user={user} kantonList={kantonList} onKantonSelect={this._handleKantonSelect} />
                    <div className='content'>
                        <Switch>
                            <Redirect exact from='/' to='/home' push/>
                            <Route exact path='/'>
                                <LoginPage history={history} location={this.props.location} onClick={this._handleSignInButtonClicked}/>
                            </Route>
                            <Route exact path='/home'>
                                <Home history={history} user={this.state.fetchedUser}/>
                            </Route>
                            {
                                hasRole(user, 'admin') 
                                &&  <Route exact path='/admin'>
                                        <AdminPanel history={history}/>
                                    </Route>
                            }
                            
                            <Route path='/school/create'>
                                <School history={history}/>
                            </Route>
                            <Route path='/teacher/create'>
                                <Teacher history={history} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            )
        }

        return (
            <div className="App">
                <Header user={user} kantonList={kantonList}/>
                <div className='content'>
                    <Switch>
                        <Route exact path='/'>
                            <LoginPage history={history} onClick={this._handleSignInButtonClicked}/>
                        </Route>
                        {isAuth && <Redirect to='/home' />}
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
            </div>
        );
    }
}
