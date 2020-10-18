import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { Button, styled, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { showAlert } from '../../Reducers/Alert/AlertActions';

const LinkBlock = styled(NavLink)({
    paddingRight: "20px",
    flexGrow: 1,
    opacity: 0.75,

    "&:hover": {
        opacity: 1
    }
});

const useStyles = makeStyles({
    activeLink: {
        opacity: 1
    }
});

const LinkText = styled(Typography)({
    color: "white",
});

const ProfileButton = styled(IconButton)({
    color: "white"
});

const ToolbarContainer = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});

const DisplayFlex = styled(Grid)({
    display: "flex"
});

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);

    const logOut = () => {
        delete localStorage["token"];
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
        <div>
            <AppBar position="static">
                <ToolbarContainer>
                    <DisplayFlex>
                        <LinkBlock to="/user/projects" activeClassName={classes.activeLink}>
                            <LinkText variant="h6">Projects</LinkText>
                        </LinkBlock>
                        <LinkBlock to="/user/faults-injection" activeClassName={classes.activeLink}>
                            <LinkText variant="h6">Faults injection</LinkText>
                        </LinkBlock>
                    </DisplayFlex>
                    <div>
                        <Link to="/user/profile">
                            <ProfileButton color="inherit">
                                <AccountCircle />
                            </ProfileButton>
                        </Link>
                        <Button variant="outlined" color="inherit" onClick={() => logOut()}>Log out</Button>
                    </div>
                </ToolbarContainer>
            </AppBar>
        </div>
    );
}

export default Navbar;