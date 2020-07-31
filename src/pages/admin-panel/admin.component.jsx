import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { UserTable } from './user-table.component';

export class AdminPanel extends React.Component {
    constructor() {
        super();

        this.state = {
            nameInput: '',
            passwordInput: '',
            users: [],
        };

        this.handleButtonClick = this._handleButtonClick.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
    }

    _handleButtonClick(e) {
        e.preventDefault();

        if (this.state.nameInput === '' || this.state.passwordInput === '') return;

        const userCopy = [...this.state.users];
        userCopy.push({
            name: this.state.nameInput,
            password: this.state.passwordInput,
        });

        this.setState({
            ...this.state,
            users: [...userCopy],
            nameInput: '',
            passwordInput: ''
        });
        //TODO Post request to API
        console.log(this.state);
    }

    onNameChange(event) {
        this.setState({
            nameInput: event.target.value
        });
    }

    onPassChange(event) {
        this.setState({
            passwordInput: event.target.value
        });
    }

    render() {
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