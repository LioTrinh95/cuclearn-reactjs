import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { formatPrice } from 'utils';

OrderProduct.propTypes = {
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    header: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
    },
    Intomoney: {
        fontWeight: '400',
        color: '#787878'
    },
    cartTotal: {
        color: '#f50057',
        fontWeight: 'bold',
    }

}));

function OrderProduct({ cartTotal = 0 }) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header} paddingBottom={2}>
                <Typography className={classes.Intomoney}>Thành Tiền</Typography>
                <Typography className={classes.cartTotal}>{formatPrice(cartTotal)}</Typography>
            </Box>
            <form>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{ width: '100%' }}
                    size='large'
                >
                    Tiến hành đặt hàng
                </Button>
            </form>
        </Box >


    );
}

export default OrderProduct;