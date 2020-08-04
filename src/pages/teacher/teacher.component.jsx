import React from 'react';
import { config } from '../../config';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';

import queryString from 'query-string';

import TeacherList from './teacher-list.component';

class Teacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            secondName: '',
            email: '',
            gender: '',
            school: '',
            schoolBuilding: '',
            subject: '',
            position: ''
        };

        this.firstNameChanged = this._firstNameChanged.bind(this);
        this.secondNameChanged = this._secondNameChanged.bind(this);
        this.emailChanged = this._emailChanged.bind(this);
        this.handleTeacherAdding = this._handleTeacherAdding.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleTeacherClick(teacher) {
        console.log({teacher});
    }

    componentWillMount() {
        document.addEventListener('keydown', this._handleKeyDown.bind(this), false);
    }

    componentDidMount() {
        const { school, building } = queryString.parse(this.props.location.search);
        this.setState({
            building
        });
        this._fetchSchoolInfo(school);
    }
    
    _fetchSchoolInfo(schoolId) {
        fetch(`${config.API}/school/${schoolId}`)
            .then(response => response.json())
            .then(([ result ]) => {
                this.setState({
                    school: result
                });

                this._setDefaultState();
            })
            .catch(error => console.log(error));
    }

    _setDefaultState() {
        const { school } = this.state;

        const [, emailDomain] = school.email.split('@');

        this.setState({
            schoolMailDomain: '@' + emailDomain,
            email: '.@' + emailDomain
        });
    }

    _firstNameChanged(event) {
        const value = event.target.value;
        const [emailEntity ,] = this.state.email.split('@');

        let newEmail;
        if (emailEntity) {
            const [, secondName] = emailEntity.split('.');
            newEmail = [value, secondName].join('.') + this.state.schoolMailDomain;
        } else {
            newEmail = [value, this.state.schoolMailDomain].join('.');
        }

        this.setState({
            firstName: value,
            email: newEmail.toLowerCase(),
        });
    }

    _secondNameChanged(event) {
        const value = event.target.value;
        const [emailEntity,] = this.state.email.split('@');

        let newEmail;
        if (emailEntity) {
            const [firstName, ] = emailEntity.split('.');
            newEmail = [firstName, value].join('.') + this.state.schoolMailDomain;
        } else {
            newEmail = ['.', value, this.state.schoolMailDomain].join('')
        }

        this.setState({
            secondName: value,
            email: newEmail.toLowerCase(),
        });
    }

    _emailChanged(event) {
        this.setState({
            email: event.target.value,
        });
    }

    _handleTeacherAdding() {
        if (
            !this.state.firstName ||
            !this.state.secondName ||
            !this.state.gender
        ) {
            return;
        }

        const teacher = {
            
        }
    }

    _handleKeyDown(event) {
        if (event.ctrlKey && event.altKey && event.key === 'm') {
            this.setState({
                gender: 'M'
            });

            this._handleTeacherAdding();
        }
        if (event.ctrlKey && event.altKey && event.key === 'f') {
            this.setState({
                gender: 'F'
            });

            this._handleTeacherAdding();
        }
    }

    render() {
        return (
            <div className='home-page'>
                <TeacherList onClick={this._handleTeacherClick.bind(this)} school={this.state.school}/>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Typography 
                        component='h1'
                        variant='h5'
                    >
                        Create Teacher
                    </Typography>

                    <TextField 
                        label='First Name'
                        fullWidth
                        required
                        margin='normal'
                        value={this.state.firstName}
                        onChange={this.firstNameChanged}
                    />
                    <TextField 
                        label='Second Name'
                        fullWidth
                        required
                        margin='normal'
                        value={this.state.secondName}
                        onChange={this.secondNameChanged}
                    />
                    <TextField 
                        label='Email'
                        fullWidth
                        required
                        margin='normal'
                        value={this.state.email}
                        onChange={this.emailChanged}
                    />
                    <TextField 
                        label='Function' 
                        select
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <TextField 
                        label='Subject' 
                        select
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <Button 
                        type='button'
                        color='primary'
                        variant='contained'
                        margin='normal'
                        onClick={this.handleTeacherAdding}
                    >
                        Save
                    </Button>
                </Container>
            </div>

            
        );
    }
}

export default withRouter(Teacher);