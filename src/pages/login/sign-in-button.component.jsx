import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#529E1C',
      '&:hover': {
        backgroundColor: green[700],
      },
    },
}))(Button);

export function SignInButton(props) {
    const { onClick } = props;

    return (
        <div>
            <ColorButton
                type="button"
                fullWidth
                variant="contained"
                margin="normal"
                color="primary"
                onClick={onClick}
            >
                Sign In
            </ColorButton>
        </div>
    );
}
