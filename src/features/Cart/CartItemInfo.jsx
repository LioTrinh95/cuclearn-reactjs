import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import QuantityField from 'components/Form-controls/QuantityField';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import * as yup from 'yup';
import { removeFromCart, setQuantity } from './cartSlice';

CartItemInfo.propTypes = {
    cartItems: PropTypes.object,
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between'
    },
    imgItem: {
        width: '130px',
        height: '130px',
    },
    deleteBtn: {
        minWidth: '0',
        padding: '0'
    }
}));

function CartItemInfo({ cartItems }) {

    //validate for quantity
    const schema = yup.object().shape({
        quantity: yup.number()
            .required('Please enter quantiy')
            .typeError('Please enter a number'),
    })

    const dispatch = useDispatch();
    const { product, quantity } = cartItems;
    const thumbnailURL = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    const form = useForm({
        defaultValues: {
            quantity: quantity,
        },
        resolver: yupResolver(schema),
    })

    const handleUpdateCart = ({ quantity }) => {
        if (quantity === 0) {
            const action = removeFromCart({
                id: product.id,
            });
            dispatch(action);
        }
        else {
            const action = setQuantity({
                id: product.id,
                quantity,
            });
            dispatch(action);
        }

    }
    const handleDeleteCart = () => {
        const action = removeFromCart({
            id: product.id,
        });
        dispatch(action);

    }

    const classes = useStyles();
    return (
        <Box>
            <Box padding={1} className={classes.item}>
                <img className={classes.imgItem}
                    src={thumbnailURL} alt='Lio'
                />
                <Box>
                    <Typography>{product.name}</Typography>
                    <form onClick={form.handleSubmit(handleDeleteCart)}>
                        <Button
                            type="submit"
                            variant="text"
                            size='small'
                            color='primary'
                            className={classes.deleteBtn}
                        >
                            Xóa
                    </Button>
                    </form>
                </Box>
                <Typography variant="body2">
                    <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                        {formatPrice(product.salePrice)}
                    </Box>
                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
                </Typography>
                <form onClick={form.handleSubmit(handleUpdateCart)} onChange={form.handleSubmit(handleUpdateCart)}>
                    <QuantityField name="quantity" form={form} />
                </form>
            </Box >
        </Box >
    );
}

export default CartItemInfo;