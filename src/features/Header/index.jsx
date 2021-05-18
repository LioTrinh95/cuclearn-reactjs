import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Login from 'features/Auth/components/Login';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Register from '../Auth/components/Register';
import { cartItemCountSelector } from 'features/Cart/selectors'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 1,
    },
}));

const MODE = {
    LOGIN: 'login',
    RESGISTER: 'register'
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header() {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id;

    const [mode, setMode] = useState(MODE.LOGIN);
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    //cart
    const cartItemsCount = useSelector(cartItemCountSelector)
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
    }
    const handleCartClick = () => {
        history.push('/Cart')
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <FavoriteIcon color="error" />
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to='/'>LIO SHOP</Link>
                    </Typography>
                    <NavLink to='/products' className={classes.link}>
                        <Button color='inherit'>Product</Button>
                    </NavLink>
                    {/* <NavLink to='/albums' className={classes.link}>
                        <Button color='inherit'>About</Button>
                    </NavLink> */}

                    <IconButton
                        aria-label="show 4 new mails"
                        color="inherit"
                        onClick={handleCartClick}
                    >
                        <Badge badgeContent={cartItemsCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {!isLoggedIn && (
                        <Button color='inherit' onClick={handleClickOpen}>
                            Login
                        </Button>
                    )
                    }
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )
                    }
                </Toolbar>
            </AppBar>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}

            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
            >
                <IconButton className={classes.closeButton} onClick={handleClose}>
                    <Close />
                </IconButton>

                <DialogContent>
                    {mode === MODE.RESGISTER &&
                        (
                            <>
                                <Register closeDialog={handleClose} />
                                <Box textAlign="center">
                                    <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                                        Already have an account. Login here
                                    </Button>
                                </Box>
                            </>
                        )
                    }
                    {mode === MODE.LOGIN &&
                        (
                            <>
                                <Login closeDialog={handleClose} />
                                <Box textAlign="center">
                                    <Button color='primary' onClick={() => setMode(MODE.RESGISTER)}>
                                        Don't have an account. Register here
                                    </Button>
                                </Box>
                            </>
                        )
                    }

                </DialogContent>
            </Dialog>
        </div>
    );
}
