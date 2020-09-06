import React from 'react';
import './page-name.component.css';

export function PageName(props) {
    const { pageName } = props;

    return (
        <div class='page-name'>
            {pageName}
        </div>
    );
}
