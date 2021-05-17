import { Box, Container, fade, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px',
    },
}))

function ListPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 9,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search])

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    });

    const [loading, setLoading] = useState(true);

    // const [filters, setFilters] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 9,
    //     _sort: queryParams._sort || 'salePrice:ASC'
    // }));

    // useEffect(() => {
    //     //Todo: Sync filters to URL
    //     history.push({
    //         pathname: history.location.patchname,
    //         search: queryString.stringify(filters)
    //     })
    // }, [history, filters])

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list', error);
            }
            setLoading(false);
        })();
    }, [queryParams]);

    const handlePageChange = (e, page) => {
        // setFilters(prevFilters => ({
        //     ...prevFilters,
        //     _page: page,
        // }))

        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.patchname,
            search: queryString.stringify(filters)
        });
    }
    const handleSortChange = (newSortValue) => {
        // setFilters(prevFilters => ({
        //     ...prevFilters,
        //     _sort: newSortValue
        // }))

        const filters = {
            ...queryParams,
            _sort: newSortValue
        }

        history.push({
            pathname: history.location.patchname,
            search: queryString.stringify(filters)
        });
    }
    const handleFiltersChange = (newFilters) => {
        // setFilters(prevFilters => ({
        //     ...prevFilters,
        //     ...newFilters,
        // }))

        const filters = {
            ...queryParams,
            ...newFilters,
        }

        history.push({
            pathname: history.location.patchname,
            search: queryString.stringify(filters)
        });
    }

    const setNewFilter = (newFilters) => {
        history.push({
            pathname: history.location.patchname,
            search: queryString.stringify(newFilters)
        });
    };
    console.log({ queryParams })
    return (
        <Box>
            <Container>
                <Grid container spacing={1} >
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                        <FilterViewer filters={queryParams} onChange={setNewFilter} />
                        <Paper elevation={0}>{loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

                            <Box className={classes.pagination}>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                ></Pagination>
                            </Box>
                        </Paper>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;