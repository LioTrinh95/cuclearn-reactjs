import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItemInfo from './CartItemInfo';
import CartUserInfo from './CartUserInfo';
import NoCart from './NoCart';
import OrderProduct from './OrderProduct';
import { cartItemCountSelector, cartTotalSelector } from './selectors';

CartFeatures.defaultProps = {
    data: [],
}
const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '910px',
        // padding: theme.spacing(1.5),
        // borderRight: `1px solid ${theme.palette.grey[300]}`,
    },

    right: {
        flex: '1 1 0',
        padding: theme.spacing(2),
    },
    header: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    countItem: {
        paddingLeft: '2px'
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',

    },
    orderProduct: {
        marginTop: theme.spacing(1),
    },
}));

function CartFeatures() {
    const cartTotal = useSelector(cartTotalSelector);
    const cartCount = useSelector(cartItemCountSelector);
    const data = useSelector(state => state.cart.cartItems);

    const classes = useStyles();
    return (
        <Box>
            <Container >
                <Box className={classes.header} >
                    <Typography component='h3' variant='h5'>GIỎ HÀNG</Typography>
                    <Typography className={classes.countItem}>({cartCount} sản phẩm)</Typography>
                </Box>

                <Grid container spacing={1} >

                    <Grid item className={classes.left} >
                        <Paper elevation={0}>
                            {data.length > 0 ?
                                data.map((cartItems) => (
                                    <CartItemInfo key={cartItems.id} cartItems={cartItems} />
                                ))
                                :
                                <NoCart />
                            }
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <CartUserInfo />
                        </Paper>
                        <Paper elevation={0} className={classes.orderProduct}>
                            <OrderProduct cartTotal={cartTotal} />
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>

    );
}

export default CartFeatures;