import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/Login';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Register from '../Auth/components/Register';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CodeIcon className={classes.menuButton} />
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to='/'>LIO SHOP</Link>
                    </Typography>
                    <NavLink to='/todos' className={classes.link}>
                        <Button color='inherit'>Todos</Button>
                    </NavLink>
                    <NavLink to='/albums' className={classes.link}>
                        <Button color='inherit'>Albums</Button>
                    </NavLink>

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
