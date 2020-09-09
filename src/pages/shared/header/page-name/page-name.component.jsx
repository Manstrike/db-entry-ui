import React from 'react';
import './page-name.component.css';

export function PageName(props) {
    const { pageName } = props;

    return (
        <div className='page-name'>
            {pageName}
        </div>
    );
}
