import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';

TabHomeFilters.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {},
    tabs: {

    },
    tab: {
        fontWeight: '900',
    },
}));

function TabHomeFilters({ onChange }) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <Paper className={classes.tabs} >
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="disabled tabs example"
            >
                <Tab label="SẢN PHẨM KHUYẾN MÃI" value={0} className={classes.tab} />
                <Tab label="GIAO HÀNG MIỄN PHÍ" value={1} className={classes.tab} />
            </Tabs>
        </Paper>
    );
}

export default TabHomeFilters;