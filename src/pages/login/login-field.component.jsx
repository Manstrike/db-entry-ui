import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LoginLogo from '../../images/svg/login-logo.svg';

export function LoginField(props) {
    const { onChange } = props;
    return (
        <div>
            <TextField 
                id="outlined-login" 
                placeholder="Login" 
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={LoginLogo} alt="Teacher Data" />
                      </InputAdornment>
                    ),
                  }}
                onChange={onChange}
            />
        </div>
    )
}
