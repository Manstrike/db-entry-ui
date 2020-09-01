import React from 'react';
import './login.component.css';
import { config } from '../../config';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { LoginField } from './login-field.component';
import { PasswordField } from './password-field.component';
import { SignInButton } from './sign-in-button.component';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
        }

        this._onClick = props.onClick;

        this._handleClick = this._handleClick.bind(this);
        this._onLoginChanged = this._onLoginChanged.bind(this);
        this._onPasswordChanged = this._onPasswordChanged.bind(this);
    }

    _handleClick(event) {
        event.preventDefault();

        if (!this.state.login || !this.state.password) return;

        const userCredentials = {
            login: this.state.login,
            password: this.state.password,
        };

        fetch(`${config.API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                name: userCredentials.login
            }),
            headers: {
                'Content-type' : 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) return null;

                return response.json();
            })
            .then((result) => {
                //TODO Add button for logout, rework this mess
                if (!result) return;
                this._onClick(userCredentials, result);
            });
    }

    _onLoginChanged(event) {
        this.setState({
            login: event.target.value
        });
    }

    _onPasswordChanged(event) {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        return (
            <div className='login-panel'>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className='someClass'>
                    <Typography component="h1" variant="h5">
                        {"Sign in"}
                    </Typography>
                    <form className='somClass' noValidate>
                        <LoginField onChange={this._onLoginChanged} />
                        <PasswordField onChange={this._onPasswordChanged} />
                        <SignInButton onClick={this._handleClick} />
                    </form>
                </div>
                </Container>
            </div>
        );
    }
}
