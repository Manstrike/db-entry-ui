import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import {
    Link
  } from "react-router-dom";

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDisabled: false,
        }

        this.onClickStart = props.onClickStart;
        this.onClickFinish = props.onClickFinish;
        this._onClickStart = this._onClickStart.bind(this);
        this._onClickFinish = this._onClickFinish.bind(this);
    }

    _onClickStart(event) {
        event.preventDefault();

        this.setState({
            startDisabled: true,
        });

        this.onClickStart();
    }

    _onClickFinish(event) {
        event.preventDefault();

        this.setState({
            startDisabled: false,
        });

        this.onClickFinish();
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        color="primary"
                        className="navButton"
                        disabled={this.state.startDisabled}
                        onClick={this._onClickStart}
                    >
                        Start timemoter
                    </Button>
                    <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        color="primary"
                        className="navButton"
                        onClick={this._onClickFinish}
                    >
                        Stop timometer
                    </Button>


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
