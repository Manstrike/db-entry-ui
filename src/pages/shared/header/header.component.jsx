import React from 'react';
import HeaderLogo from '../../../images/svg/teacher-data.svg';
import { KantonSelect } from './kanton-select/kanton-select.component';
import { PageName } from './page-name/page-name.component';
import { userAuthentificated } from '../../../utils/auth';
import { getPageName } from '../../../utils/pageName';
import { UserDetails } from './user-details/user-details.component';
import './header.component.css';

export function Header(props) {
    const { kantonList, onKantonSelect } = props;
    
    const authUser = userAuthentificated();
    const pageName = getPageName();
    
    const handleLogout = () => {
        sessionStorage.setItem('user', null);
        window.location = '/';
    };

    return (
        <div className='header'>
            <div className='header__text'>
                <img src={HeaderLogo} alt="Teacher Data" />
            </div>
            {authUser &&
                <div className='header__controls'>
                    <KantonSelect kantonList={kantonList} onSelect={onKantonSelect}/>
                    <PageName pageName={pageName}/>
                    <UserDetails username={authUser.name} onClick={handleLogout} />
                </div>
            }
        </div>
    );
}
