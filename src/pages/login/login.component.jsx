import React from 'react';

import { config } from '../../config';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
                console.log({result})
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className='someClass'>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className='somClass' noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            onChange={this._onLoginChanged}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this._onPasswordChanged}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className='cssdds'
                            onClick={this._handleClick}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}
