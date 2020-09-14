import React from 'react';
import './app.component.css';
import { authentificate, userAuthentificated, hasRole } from './utils/auth';
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
            kantonList: [],
            user: null
        };

        this.handleSignInButtonClicked = this._handleSignInButtonClicked.bind(this);
        this.handleKantonSelected = this._handleKantonSelected.bind(this);
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
        const { login, password } = userCredentials;

        if (password === fetchedUser.password && login === fetchedUser.name) {
            authentificate(JSON.stringify(fetchedUser));
            console.log('before', this.state.user)

            this.setState({
                user: fetchedUser
            });
            console.log('after', this.state.user)
        }
    }

    _handleKantonSelected(event) {
        const kantonId = event.target.value || null;

        sessionStorage.setItem('kanton', kantonId);
        this.setState({
            kanton: kantonId
        });
    }

    render() {
        const { history } = this.props;
        const { kantonList } = this.state;
        const authUser = userAuthentificated();
        
        if (authUser) {
            return (
                <div className="App">
                    <Header user={authUser} kantonList={kantonList} onKantonSelect={this.handleKantonSelected} />
                    <div className='content'>
                        <Switch>
                            <Redirect exact from='/' to='/home' push/>
                            <Route exact path='/'>
                                <LoginPage history={history} location={this.props.location} onClick={this.handleSignInButtonClicked}/>
                            </Route>
                            <Route exact path='/home'>
                                <Home history={history} user={authUser}/>
                            </Route>
                            {
                                hasRole(authUser, 'admin') 
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
                <Header user={authUser} kantonList={kantonList} onKantonSelect={this.handleKantonSelected} />
                <div className='content'>
                    <Switch>
                        <Route exact path='/'>
                            <LoginPage history={history} onClick={this.handleSignInButtonClicked}/>
                        </Route>
                        {authUser && <Redirect to='/home' />}
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
