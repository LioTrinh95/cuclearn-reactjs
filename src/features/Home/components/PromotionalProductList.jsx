import { Box, Grid } from '@material-ui/core';
import Product from 'features/Product/components/Product';
import PropTypes from 'prop-types';
import React from 'react';

PromotionalProductList.propTypes = {
    data: PropTypes.array,
};

PromotionalProductList.defaultProps = {
    data: [],
}

function PromotionalProductList({ data }) {


    return (
        <Box>
            <Grid container>
                {data.map((product) => (
                    <Grid item key={product.id} xs={12} sm={4} md={3} lg={2} >
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PromotionalProductList;