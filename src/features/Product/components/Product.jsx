import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
    product: PropTypes.object,

};

function Product({ product }) {
    const thumbnailURL = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;


    return (
        <Box padding={1}>
            <Box padding={1}>
                <img
                    src={thumbnailURL}
                    alt={product.name}
                    width="100%"
                />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">{product.salePrice} - {product.promotionPercent} </Typography>
        </Box>
    );
}

export default Product;