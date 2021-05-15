import { Box, Chip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',

        padding: 0,
        margin: theme.spacing(2, 0),
        listStyleType: 'none',
        '& > li': {
            margin: 0,
            padding: theme.spacing(1),
        },
    },
}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: (filters) => {
            const newFilter = { ...filters };
            if (newFilter.isFreeShip) {
                delete newFilter.isFreeShip
            } else {
                newFilter.isFreeShip = true;
            }
            return newFilter;
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('isPromotion'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilter = { ...filters };
            delete newFilter.isPromotion;
            return newFilter;
        },
        onToggle: () => { },
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${filters.salePrice_gte} đến  ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('salePrice_lte')
            && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilter = { ...filters };
            delete newFilter.salePrice_lte;
            delete newFilter.salePrice_gte;
            return newFilter;
        },
        onToggle: () => { },
    },
    // {
    //     id: 4,
    //     getLabel: (filters) => 'Danh mục',
    //     isActive: () => true,
    //     isVisible: (filters) => true,
    //     isRemovable: true,
    //     onRemove: (filters) => { },
    //     onToggle: (filters) => { },
    // },

]

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,

};

function FilterViewer({ filters = {}, onChange = null }) {
    const classes = useStyles();
    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));

    }, [filters])
    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        size="small"
                        onClick={x.isRemovable
                            ? null
                            : () => {
                                if (!onChange) return;
                                const newFilter = x.onToggle(filters);
                                onChange(newFilter);
                            }}
                        onDelete={
                            x.isRemovable
                                ? () => {
                                    if (!onChange) return;
                                    const newFilter = x.onRemove(filters);
                                    onChange(newFilter);
                                }
                                : null
                        }
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;