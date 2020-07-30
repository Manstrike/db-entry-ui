import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import {
    Route,
    Switch,
    Redirect,
    withRouter
  } from "react-router-dom";

export class Home {
    _useStyles() {
        return makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }
        
        }));
    }
    render() {
        const classes = this._useStyles();
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Switch>
                        <Route path="/school">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create School
                            </Button>
                        </Route>
                        <Route path="/teacher">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create Teacher
                            </Button>
                        </Route>
                        <Route path="/admin">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Admin Panel
                            </Button>
                        </Route>
                    </Switch>
                </div>
            </Container>
        );
    }
}