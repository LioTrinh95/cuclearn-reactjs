import { Box, Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import dataTest from 'api/dataTest';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import PromotionalProductList from './components/PromotionalProductList';
import SliderBanner from './components/SliderBanner';
import TabHomeFilters from './components/TabHomeFilters';

HomeFeatures.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
    },
    bannerLeft: {
        width: '824px',
        paddingRight: '8px',
    },
    bannerRight: {
        flex: '1 1 0',
        overflow: 'hidden',
        '& > img': {
            borderRadius: '2px',

        }
    },
    // promotionalHeader: {
    //     padding: theme.spacing(2),
    //     color: '#ff6a1a',
    //     fontWeight: '900',
    //     borderBottom: `1px solid ${theme.palette.grey[200]}`,
    // },
    button: {
        margin: theme.spacing(2),
    }
}))

function HomeFeatures(props) {
    const classes = useStyles();
    const limitPage = 18;

    const [sliderData, setSliderData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [seeMore, setSeeMore] = useState({
        limit: limitPage,
        page: 1,
        isPromotion: true,
        isFreeShip: false,
        _sort: 'salePrice:ASC',
    });
    const [totalCountProduct, setTotalCountProduct] = useState(0);

    const queryparams = useMemo(() => {
        return {
            _page: 1,
            _limit: seeMore.limit,
            isPromotion: seeMore.isPromotion,
            isFreeShip: false.isFreeShip,
            _sort: 'salePrice:ASC',
        }
    }, [seeMore])

    useEffect(() => {
        (async () => {
            try {
                const result = await dataTest.getSliderAll();
                setSliderData(result);
            } catch (error) {
                console.log('Faile to featch data Slider', error);
            }

        })();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const result = await productApi.getAll(queryparams);
                setProductList(result.data);
                setTotalCountProduct(result.pagination?.total);

            } catch (error) {
                console.log('Faile tod featch data promotional', error);
            }
        })();
    }, [queryparams])

    const handleSubmitSeeMore = () => {
        setSeeMore({
            ...seeMore,
            limit: seeMore.limit + limitPage,
        });
    }
    const handleProductTabChange = (newValue) => {
        if (newValue === 1) {
            setSeeMore({
                ...seeMore,
                limit: limitPage,
                isPromotion: false,
                isFreeShip: true,
            });

        }
        else {
            setSeeMore({
                ...seeMore,
                limit: limitPage,
                isPromotion: true,
                isFreeShip: false,
            });
        }

    }

    return (
        <Box marginTop={2}>
            <Container>
                <Grid container>
                    <Grid item className={classes.bannerLeft}>
                        <SliderBanner sliderData={sliderData} />
                    </Grid>
                    <Grid item className={classes.bannerRight}>
                        <img src="https://salt.tikicdn.com/cache/w408/ts/banner/69/9a/36/dcff148edf2a3918a8ac974d4b75cb20.png.jpg" />
                    </Grid>
                </Grid>
                <Box marginTop={2}>
                    <Paper elevation={0}>
                        <TabHomeFilters onChange={handleProductTabChange} />
                        <PromotionalProductList data={productList} />
                        {seeMore.limit < totalCountProduct &&
                            <Box display="flex" justifyContent="center">
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    style={{ width: '20%' }}
                                    size='small'
                                    className={classes.button}
                                    onClick={handleSubmitSeeMore}
                                >Xem thêm</Button>
                            </Box>
                        }
                    </Paper>
                </Box>
            </Container>
        </Box >
    );
}

export default HomeFeatures;