import React from 'react';
import './app.component.css';

import { LoginPage } from './pages/login/login.component';

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
                <LoginPage history={history} onClick={this._handleSignInButtonClicked}/>
            </div>
        );
    }
}
