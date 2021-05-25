import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

NoCart.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        textAlign: 'center'
    },
    imgItem: {
        width: '190px',
        height: '160px',
        paddingBottom: theme.spacing(2),
    },
    button: {
        backgroundColor: '#fdd835',
        color: '#85773f',
        marginTop: theme.spacing(2),
    }
}));

function NoCart(props) {
    const classes = useStyles();
    return (
        <Box padding={1} className={classes.item}>
            <img className={classes.imgItem} alt="Lio 1"
                src='https://salt.tikicdn.com/desktop/img/mascot@2x.png'
            />
            <Typography>Không có sản phẩm nào trong giỏ hàng của bạn.</Typography>
            <form>
                <Button
                    type="submit"
                    variant="text"
                    style={{ width: '30%' }}
                    size='medium'
                    className={classes.button}
                >
                    Tiếp tục mua sắm
                </Button>
            </form>
        </Box>
    );
}

export default NoCart;