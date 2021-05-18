import { yupResolver } from '@hookform/resolvers/yup';
import { Box, makeStyles, Typography } from '@material-ui/core';
import QuantityField from 'components/Form-controls/QuantityField';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { formatPrice } from 'utils';
import * as yup from 'yup';

CartItemInfo.propTypes = {
    cartItems: PropTypes.object,
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
}));

function CartItemInfo({ cartItems }) {

    //validate for quantity
    const schema = yup.object().shape({
        quantity: yup.number()
            .required('Please enter quantiy')
            .min(1, 'Minimin value is 1')
            .typeError('Please enter a number'),
    })


    const { id, product, quantity } = cartItems;
    const thumbnailURL = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    })

    const classes = useStyles();
    return (
        // <Box padding={1} onClick={handleClick}>
        //     <Box padding={1} minHeight="215px">
        //         <img
        //             src={thumbnailURL}
        //             alt={product.name}
        //             width="100%"
        //         />
        //     </Box>
        //     <Typography variant="body2">{product.name}</Typography>
        //     <Typography variant="body2">
        //         <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
        //             {formatPrice(product.salePrice)}
        //         </Box>
        //         {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''} </Typography>
        // </Box>
        <Box>
            <Box padding={1} className={classes.item}>
                <img className={classes.imgItem}
                    src={thumbnailURL}
                />
                <Typography>{product.name}</Typography>

                <Typography variant="body2">
                    <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                        {formatPrice(product.salePrice)}
                    </Box>
                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
                </Typography>
                <form>
                    <QuantityField name='quantity' form={form} />
                </form>
            </Box>
        </Box>
    );
}

export default CartItemInfo;