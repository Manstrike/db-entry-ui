import React from 'react';

import { config } from '../../config';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { UserTable } from './user-table.component';

export class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        const currentUser = JSON.parse(localStorage.getItem('user'));

        this.state = {
            nameInput: '',
            passwordInput: '',
            users: [],
            userAllowedAccess: currentUser.role === 'admin',
        };

        this.handleButtonClick = this._handleButtonClick.bind(this);
        this.onNameChange = this._onNameChange.bind(this);
        this.onPassChange = this._onPassChange.bind(this);
    }

    _handleButtonClick(event) {
        event.preventDefault();

        if (this.state.nameInput === '' || this.state.passwordInput === '') return;

        const userCopy = [...this.state.users];
        const newUser = {
            name: this.state.nameInput,
            password: this.state.passwordInput,
        }

        fetch(`${config.API}/user/create`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-type' : 'application/json'
            }
        })
        .then(response => response)
        .then(result => {
            console.log({result})
            if (result.status === 200) {
                userCopy.push(newUser);

                this.setState({
                    ...this.state,
                    users: [...userCopy],
                    nameInput: '',
                    passwordInput: ''
                });
            }
        });
    }

    _onNameChange(event) {
        this.setState({
            nameInput: event.target.value
        });
    }

    _onPassChange(event) {
        this.setState({
            passwordInput: event.target.value
        });
    }

    render() {
        const { userAllowedAccess } = this.state;

        if (!userAllowedAccess) return null;

        return (
            <Container component='main' maxWidth="xs">
                <CssBaseline />
                <Typography component="h1" variant="h5">
                        Admin Panel
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Login"
                    name="login"
                    autoFocus
                    onChange={this.onNameChange}
                    value={this.state.nameInput}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    value={this.state.passwordInput}
                    onChange={this.onPassChange}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleButtonClick}
                >
                    Create user
                </Button>

                <UserTable users={this.state.users} />
            </Container>
        )
    }
}