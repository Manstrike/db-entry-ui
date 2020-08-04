import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import {
    Link
  } from "react-router-dom";

export class Menu extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="navButton"
                        component={Link}
                        to='/school/create'
                    >
                        Create School
                    </Button>
                    <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        color="primary"
                        className="navButton"
                        component={Link}
                        to='/admin'
                    >
                        Admin Panel
                    </Button>
                </div>
            </Container>
        );
    }
}
