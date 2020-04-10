import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, styled, Grid } from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showAlert } from '../../Reducers/Alert/AlertActions';

const LinkBlock = styled(Link)({
    paddingRight: "20px",
    flexGrow: 1
});

const LinkText = styled(Typography)({
    color: "white"
});

const ProfileButton = styled(IconButton)({
    color: "white"
});

const Navbar = () => {
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
                <Toolbar>
                    <LinkBlock to="/user/projects">
                        <LinkText variant="h6">Projects</LinkText>
                    </LinkBlock>
                    <Link to="/user/profile">
                        <ProfileButton color="inherit">
                            <AccountCircle />
                        </ProfileButton>
                    </Link>
                    <Button variant="outlined" color="inherit" onClick={() => logOut()}>Log out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;