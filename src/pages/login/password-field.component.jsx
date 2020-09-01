import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyLogo from '../../images/svg/key.svg';

export function PasswordField(props) {
    const { onChange } = props;
    return (
        <div>
            <TextField 
                id="outlined-password" 
                placeholder="Password" 
                type="password"
                variant="outlined"
                autoComplete='off'
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={KeyLogo} alt="Password Logo" />
                      </InputAdornment>
                    ),
                  }}
                onChange={onChange}
            />
        </div>
    )
}