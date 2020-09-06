import React from 'react';
import './kanton-select.component.css';

import { Select, MenuItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    kanton: {
        color: 'white'
    },
    icon: {
        fill: 'white'
    }
}));

export function KantonSelect(props) {
    const { kantonList, onSelect } = props;
    const classes = useStyles();
    const selectedKanton = localStorage.getItem('kanton');

    return (
        <div className='kanton-select'>
            <div className='kanton-label'>
                Kanton:
            </div>
            <Select
                className={classes.kanton}
                inputProps={{
                    classes: {
                        icon: classes.icon
                    }
                }}
                defaultValue={selectedKanton || null}
                onChange={onSelect}
            >
                <MenuItem value=''>
                   {'Select'}
                </MenuItem>
                {kantonList.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option.id}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}