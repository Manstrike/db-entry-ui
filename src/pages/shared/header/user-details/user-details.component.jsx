import React from 'react';
import { Typography, Link } from '@material-ui/core';

import './user-details.component.css';
import AccLogo from '../../../../images/svg/account.svg';

export function UserDetails(props) {
    const { username, onClick } = props;

    return (
        <div className='user-details'>
            <div className='user-details__username'>{username}</div>
            <div className='user_details__acc-logo'>
                <img src={AccLogo} alt='Account logo'/>
            </div>
            <div className='user-details__logout'>
                <Typography>
                    <Link href='#' color="inherit" onClick={onClick}>Logout</Link>
                </Typography>
            </div>
        </div>
    );
}
