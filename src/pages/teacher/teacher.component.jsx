import React from 'react';
import queryString from 'query-string';

import { config } from '../../config';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';

import { TeacherList } from './teacher-list.component';

class Teacher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            firstName: '',
            secondName: '',
            email: '',
            gender: '',
            school: null,
            schoolBuilding: '',
            subject: '',
            position: '',
            teacherList: [],
            schoolId: null,
            buildingId: null,
        };

        this.firstNameChanged = this._firstNameChanged.bind(this);
        this.secondNameChanged = this._secondNameChanged.bind(this);
        this.emailChanged = this._emailChanged.bind(this);
        this.handleTeacherAdding = this._handleTeacherAdding.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
        this.saveAsMale = this._saveAsMale.bind(this);
        this.saveAsFemale = this._saveAsFemale.bind(this);
    }

    _handleTeacherClick(teacher) {
        if (!teacher) return;

        this.setState({
            id: teacher.id,
            firstName: teacher.firstName,
            secondName: teacher.secondName,
            email: teacher.email,
            gender: teacher.gender,
            subject: teacher.subject,
            position: teacher.position
        });
    }

    componentDidMount() {
        const { school, building } = queryString.parse(this.props.location.search);
        document.addEventListener('keydown', this._handleKeyDown.bind(this), false);

        this.setState({
            schoolId: school,
            buildingId: building
        });

        this._fetchSchoolInfo();
        this._fetchSchoolTeachers();
    }
    
    _fetchSchoolInfo() {
        const { school } = queryString.parse(this.props.location.search);

        if (this.state.school) return;

        fetch(`${config.API}/school/${school}`)
            .then(response => response.json())
            .then((result ) => {
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
        console.log(this.state)
        if (
            !this.state.firstName ||
            !this.state.secondName ||
            !this.state.gender
        ) {
            return;
        }
        console.log('got here2')

        const teacher = {
            id: this.state.id,
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            gender: this.state.gender,
            position: this.state.position,
            subject: this.state.subject,
            email: this.state.email,
            school: this.state.schoolId,
            building: this.state.buildingId
        };

        const author = JSON.parse(sessionStorage.getItem('user'));

        const data = {
            ...teacher,
            author: {
                ...author
            }
        }

        fetch(`${config.API}/teacher/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json'
            }
        }).then(response => {
            if (response.status !== 200) {
                console.warn('Something wend wrong');
                return;
            }

            this.setState({
                id: null,
                firstName: '',
                secondName: '',
                email: '',
                gender: '',
                school: '',
                schoolBuilding: '',
                subject: '',
                position: ''
            });
            this.firstName.focus();
            this._fetchSchoolTeachers();
        });
    }

    _handleKeyDown(event) {
        if (event.ctrlKey &&  event.key === 'm') {
            this._saveAsMale();
        }
        if (event.ctrlKey && event.altKey && event.key === 'f') {
            this._saveaAsFemale();
        }
    }

    _saveAsMale() {
        this.setState({
            gender: 'M'
        }, () => this._handleTeacherAdding());
    }

    _saveAsFemale() {
        this.setState({
            gender: 'F'
        }, () => this._handleTeacherAdding());
    }

    _fetchSchoolTeachers() {
        const { school, building } = queryString.parse(this.props.location.search);
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        const route = building 
            ? `${config.API}/teacher/building/${school}/${building}/${currentUser.id}`
            : `${config.API}/teacher/school/${school}/${currentUser.id}`;
        
        fetch(route)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    teacherList: result
                });
            });
    }

    _fetchSubjects() {
        //TODO
    }

    _fetchFunctions() {
        //TODO
    }

    render() {
        const { teacherList, school } = this.state;
        return (
            <div className='home-page'>
                <TeacherList onClick={this._handleTeacherClick.bind(this)} entries={teacherList} school={school}/>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Typography 
                        component='h1'
                        variant='h5'
                    >
                        Create Teacher
                    </Typography>
                    <Typography 
                        component='h1'
                        variant='h6'
                    >
                        Insert info, then use TAB button to choose gender and save immediately
                    </Typography>

                    <TextField 
                        label='First Name'
                        fullWidth
                        required
                        margin='normal'
                        value={this.state.firstName}
                        onChange={this.firstNameChanged}
                        InputProps={{ inputProps: { tabIndex: 0 } }}
                        inputRef={(input) => { this.firstName = input }}
                    />
                    <TextField 
                        label='Second Name'
                        fullWidth
                        required
                        margin='normal'
                        value={this.state.secondName}
                        onChange={this.secondNameChanged}
                        InputProps={{ inputProps: { tabIndex: 0 } }}
                    />
                    <TextField 
                        label='Email'
                        fullWidth
                        required
                        margin='normal'
                        value={this.state.email}
                        onChange={this.emailChanged}
                        InputProps={{ inputProps: { tabIndex: -1 } }}
                    />
                    <Button
                        type='button'
                        color='primary'
                        variant='contained'
                        margin='normal'
                        onTouchTap={this.saveAsMale}
                        onClick={this.saveAsMale}
                        InputProps={{ inputProps: { tabIndex: 1 } }}
                    >
                        Save as Male
                    </Button>
                    <Button
                        type='button'
                        color='primary'
                        variant='contained'
                        margin='normal'
                        onTouchTap={this.saveAsFemale}
                        onClick={this.saveAsFemale}
                        InputProps={{ inputProps: { tabIndex: 1 } }}
                    >
                        Save as Female
                    </Button>
                    <Button
                        type='button'
                        color='primary'
                        variant='contained'
                        margin='normal'
                        component={Link}
                        to='/home'
                    >
                        Return
                    </Button>
                </Container>
            </div>

            
        );
    }
}

export default withRouter(Teacher);