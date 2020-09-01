import React from 'react';

export function PageName(props) {
    const { pageName } = props;

    return (
        <div class='page-name'>
            {pageName}
        </div>
    );
}
