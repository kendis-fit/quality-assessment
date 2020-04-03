import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Reducers/Alert/AlertActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
    link: {
        color: "white"
    }
  }),
);

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);

    const logOut = () => {
        delete sessionStorage["token"];
        setIsRedirect(true);
        dispatch(showAlert({
            open: true,
            color: "info",
            message: "Session has just finished"
        }))
    }

    if (isRedirect) {
        return <Redirect to="/login" />
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/user/projects" className={`${classes.title} ${classes.link}`}>
                        <Typography variant="h6">Projects</Typography>
                    </Link>
                    <Link to="/user/profile" className={classes.link}>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Link>
                    <Button variant="outlined" color="inherit" onClick={() => logOut()}>Log out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;