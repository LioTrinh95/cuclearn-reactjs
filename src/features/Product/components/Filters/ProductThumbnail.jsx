import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { STATIC_HOST } from 'constants/index.js';
import { THUMBNAIL_PLACEHOLDER } from 'constants/common';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({ product }) {
    const thumbnailURL = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;
    return (
        <Box>
            <img
                src={thumbnailURL}
                alt={product.name}
                width="100%"
            />
        </Box>
    );
}

export default ProductThumbnail;