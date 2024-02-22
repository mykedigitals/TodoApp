import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {AppBar, Typography, Button, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "../../store/actions/authActions"


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    linkStyle:{
        color: "#fafafa",
        textDecoration: "none",
    },

});

const NavBar = () => {
    const classes = useStyles()
    //const state = useSelector(state => state)
    const auth = useSelector(state => state.auth)
    //console.log(state)
    const history = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = () => {
        //signOut the user
        dispatch(signOut())
        history('/signIn')
    }

    return ( 
        <>
        <AppBar position = 'static'>
            <Toolbar>
                <Typography variant='h4' className={classes.root}>
                    <Link className = {classes.linkStyle} to = "/">
                        ToDo App;
                    </Link>
                </Typography>
                { auth._id ? (
                    <>
                    <Typography variant = "subtitle2" className={classes.root}>
                    Logged in as {auth.name}
                    </Typography>
                    <Button onClick = {() => handleSignOut()} color = "inherit">
                        Sign Out
                    </Button>
                    </>
                ) : (
                    <>
                    <Button color = "inherit">
                        <Link className = {classes.linkStyle} to = "/signIn">
                            Sign In
                        </Link>
                        </Button>
                        <Button color = "inherit">
                            <Link className = {classes.linkStyle} to = "/signUp">
                                Sign Up
                            </Link>
                        </Button>
                    </>
                    )
                }
                
                
            </Toolbar>
        </AppBar>
        </>
    );
}
 
export default NavBar;