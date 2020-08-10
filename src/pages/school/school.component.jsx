import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

import { config } from '../../config';

export class School extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communitiesList: [],
            level: '',
            community: '(ORS)',
            street: '',
            postalCode: '',
            city: '',
            email: '',
            website: '',
            schoolBuildings: ''
        };

        this.onClick = this._onClick.bind(this);
    }

    componentDidMount() {
        this._fetchCommunities();
    }

    _fetchCommunities() {
        fetch(`${config.API}/school/communities`)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    communitiesList: [...result]
                });
            });
    }

    _onChange(role, event) {
        this.setState({
            [role]: event.target.value
        });
    }

    _onClick(event) {
        event.preventDefault();

        if (
            this.state.level === '' ||
            this.state.community === '' ||
            this.state.street === '' ||
            this.state.postalCode === '' ||
            this.state.city === '' ||
            this.state.email === ''
        ) {
            return;
        }

        const school = {
            level: this.state.level,
            community: this.state.community,
            street: this.state.street,
            postalCode: this.state.postalCode,
            city: this.state.city,
            email: this.state.email,
            website: this.state.website,
            schoolBuildings: this.state.schoolBuildings.split(',')
        }

        fetch(`${config.API}/school/create`, {
            method: 'POST',
            body: JSON.stringify(school),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 200) return;

            this.setState({
                level: '',
                community: '',
                street: '',
                postalCode: '',
                city: '',
                email: '',
                website: '',
                schoolBuildings: ''
            });
        });
    }

    render() {
        const { communitiesList } = this.state;

        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Typography 
                    component='h1'
                    variant='h5'
                >
                    Create School
                </Typography>

                <TextField 
                    label='School Level'
                    fullWidth
                    required
                    margin='normal'
                    value={this.state.level}
                    onChange={this._onChange.bind(this, 'level')}
                />
                <TextField 
                    label='Community' 
                    select
                    fullWidth
                    required
                    margin='normal'
                    value={this.state.community}
                    onChange={this._onChange.bind(this, 'community')}
                >
                    {communitiesList.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField 
                    label='Street'
                    fullWidth
                    required
                    margin='normal'
                    value={this.state.street}
                    onChange={this._onChange.bind(this, 'street')}
                />
                <TextField 
                    label='Postal Code'
                    fullWidth
                    required
                    margin='normal'
                    value={this.state.postalCode}
                    onChange={this._onChange.bind(this, 'postalCode')}
                />
                <TextField 
                    label='City'
                    fullWidth
                    required
                    margin='normal'
                    value={this.state.city}
                    onChange={this._onChange.bind(this, 'city')}
                />
                <TextField 
                    label='Email'
                    fullWidth
                    required
                    margin='normal'
                    value={this.state.email}
                    onChange={this._onChange.bind(this, 'email')}
                />
                <TextField 
                    label='Website'
                    fullWidth
                    margin='normal'
                    value={this.state.website}
                    onChange={this._onChange.bind(this, 'website')}
                />
                <TextField 
                    label='School Buildings'
                    fullWidth
                    margin='normal'
                    value={this.state.schoolBuildings}
                    onChange={this._onChange.bind(this, 'schoolBuildings')}
                />
                <Button 
                    type='submit'
                    color='primary'
                    variant='contained'
                    margin='normal'
                    onClick={this.onClick}
                >
                    Save
                </Button>
            </Container>
        );
    }
}