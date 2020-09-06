import React from 'react';
import HeaderLogo from '../../../images/svg/teacher-data.svg';
import { KantonSelect } from './kanton-select/kanton-select.component';
import { PageName } from './page-name/page-name.component';
import { isAuthentificated } from '../../../utils/auth';
import { getPageName } from '../../../utils/pageName';
import { UserDetails } from './user-details/user-details.component';
import './header.component.css';

export function Header(props) {
    const {  kantonList, onKantonSelect } = props;
    
    const user = props.user || JSON.parse(localStorage.getItem('user'));
    
    const isAuth = isAuthentificated(user);
    const pageName = getPageName();
    console.log({pageName})
    const handleLogout = () => {
        localStorage.setItem('user', null);
        window.location = '/';
    }
    return (
        <div className='header'>
            <div className='header__text'>
                <img src={HeaderLogo} alt="Teacher Data" />
            </div>
            {isAuth &&
                <div className='header__controls'>
                    <KantonSelect kantonList={kantonList} onSelect={onKantonSelect}/>
                    <PageName pageName={pageName}/>
                    <UserDetails username={user.name} onClick={handleLogout} />
                </div>
            }
        </div>
    );
}
