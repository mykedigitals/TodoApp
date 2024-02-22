import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

import { signIn } from '../../store/actions/authActions';

import { Typography, TextField, Button } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    formStyle: {
        margin: "0px auto",
        padding: "30px",
        borderRadius: "9px",
        boxShadow: "0px 0px 12px -3px #000000",
    },
    lineSpacing: {
        marginTop: "20px",
    }
})

const SignIn = () => {
    const classes= useStyles()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signIn(creds))
        setCreds({
            email: "", 
            password: "",
        });
    };

    if (auth._id) return <Navigate to = "/"/>

    return ( 
        <>
        <form 
        className={classes.formStyle} 
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
        >
            <Typography variant="h5">
                Sign In
            </Typography>
            <TextField
                className={classes.lineSpacing}            
                id="Enter email"
                label="Enter email"
                variant='outlined'
                fullWidth
                value = {creds.email}
                onChange={(e) => setCreds({...creds, email: e.target.value})}
            />
            <TextField
                className={classes.lineSpacing}
                id="Enter password"
                type='password'
                label="Enter password"
                variant='outlined'
                fullWidth
                value = {creds.password}
                onChange={(e) => setCreds({...creds, password: e.target.value})}
            />

            <Button 
            className={classes.lineSpacing}
            variant="contained"
            color="primary"
            type="submit"
            >
                Sign In
            </Button>
        </form>
        </>
     );
}
 
export default SignIn;