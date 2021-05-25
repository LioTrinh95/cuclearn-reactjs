import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
CartUserInfo.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {},
    header: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
    },
    Deliveryaddress: {
        fontWeight: '500',
        fontSize: '14px'
    },
    change: {
        fontSize: '14px'
    },
    body: {
        display: 'flex',
        flexFlow: 'row nowrap',
        marginTop: theme.spacing(2),
        fontWeight: '400',

    },
    name: {
        paddingRight: theme.spacing(1),
        borderRight: '1px solid #e2e1e1',
        fontWeight: '500'
    },
    phone: {
        paddingLeft: theme.spacing(1),
        fontWeight: '500'
    },
    address: {
        fontWeight: '400',
        fontSize: '12px',
        color: '#787878'
    }

}));

function CartUserInfo(props) {
    const classes = useStyles();
    return (
        <Box padding={2}>
            <Box className={classes.header}>
                <Typography className={classes.Deliveryaddress}>Địa chỉ nhận hàng</Typography>
                <Link className={classes.change}>Thay đổi</Link>
            </Box>
            <Box className={classes.body}>
                <Typography className={classes.name}>Trịnh Hữu Cúc</Typography>
                <Typography className={classes.phone} >0343365144</Typography>
            </Box>
            <Box marginTop={2}>
                <Typography className={classes.address} >112 Đông Hồ, Phường 08, Quận Tân Bình, Hồ Chí Minh</Typography>
            </Box>
        </Box>
    );
}

export default CartUserInfo;