import React from 'react';
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
    const { kantonList } = props;
    const classes = useStyles();

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
            >
                <MenuItem value=''>
                   <em>None</em>
                </MenuItem>
                {kantonList.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}