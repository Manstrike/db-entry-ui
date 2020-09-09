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

        const currentUser = JSON.parse(sessionStorage.getItem('user'));

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

    componentDidMount() {
        this._fetchUserList();
    }

    _fetchUserList() {
        fetch(`${config.API}/user/all`)
            .then(response => response.json())
            .then(res => {
                console.log({res})
                this.setState({
                    users: res
                });
            });
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
        .then(response => {
            if (response.status !== 200) {
                return;
            }
            return response;
        })
        .then(result => {
            console.log({result})
            if (!result) return;
            userCopy.push(newUser);

            this.setState({
                ...this.state,
                users: [...userCopy],
                nameInput: '',
                passwordInput: ''
            });
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
        const { history } = this.props;

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
                    variant="contained"
                    color="primary"
                    margin='normal'
                    onClick={this.handleButtonClick}
                >
                    Create user
                </Button>
                <Button 
                    type='button'
                    color='primary'
                    variant='contained'
                    margin='normal'
                    onClick={history.back}
                >
                    Return
                </Button>

                <UserTable users={this.state.users} />
            </Container>
        )
    }
}