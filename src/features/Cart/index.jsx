import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { cartItemCountSelector, cartTotalSelector } from './selectors';
import PropTypes from 'prop-types';
import CartItemInfo from './CartItemInfo';
import CartUserInfo from './CartUserInfo';
CartFeatures.propTypes = {
    product: PropTypes.object,
};

CartFeatures.defaultProps = {
    data: [],
}
const useStyles = makeStyles(theme => ({
    root: { paddingBottom: theme.spacing(3) },
    left: {
        width: '910px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },

    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
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
}));

function CartFeatures({ data }) {
    const cartTotal = useSelector(cartTotalSelector);
    const cartCount = useSelector(cartItemCountSelector);
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Container >
                <Box className={classes.header} >
                    <Typography component='h3' variant='h5'>GIỎ HÀNG</Typography>
                    <Typography className={classes.countItem}>({cartCount} sản phẩm)</Typography>
                </Box>
                <Paper elevation={0}>
                    <Grid container >
                        {data.map((product) => (
                            <Grid item className={classes.left} >
                                <CartItemInfo product={product} />
                            </Grid>
                        ))}
                        <Grid item className={classes.right}>
                            <CartUserInfo />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default CartFeatures;