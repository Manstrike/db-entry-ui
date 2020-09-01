import React from 'react';
import HeaderLogo from '../../../images/svg/teacher-data.svg';
import { KantonSelect } from './kanton-select.component';
import { PageName } from './page-name.component';
import { isAuthentificated } from '../../../utils/auth';
import { getPageName } from '../../../utils/pageName';

export function Header(props) {
    const { user, kantonList } = props;
    const isAuth = isAuthentificated(user);
    const pageName = getPageName()
    return (
        <div className='header'>
            <div className='header__text'>
                <img src={HeaderLogo} alt="Teacher Data" />
            </div>
            {isAuth &&
                <div className='header__controls'>
                    <KantonSelect kantonList={kantonList}/>
                    <PageName value={pageName}/>
                </div>
            }
        </div>
    );
}
