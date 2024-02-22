import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Typography, TextField, Button } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

import { signUp } from '../../store/actions/authActions';
import authReducer from '../../store/reducers/authReducer';

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

const SignUp = () => {
    const classes= useStyles()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signUp(user))
        setUser({
            name: "",
            email: "",
            password: ""
        })
    };

    if (auth._id) return <Navigate to="/" />

    return ( 
        <>
        <form 
        className={classes.formStyle} 
        noValidate
        autoComplete='off'
        onSubmit = { handleSubmit }
        >
            <Typography variant="h5">
                Sign Up
            </Typography>
            <TextField
                className={classes.lineSpacing}            
                id="Enter name"
                label="Enter name"
                variant='outlined'
                fullWidth
                value = { user.name }
                onChange={(e) => setUser({ ...user, name: e.target.value})}
            />
            <TextField
                className={classes.lineSpacing}            
                id="Enter email"
                label="Enter email"
                variant='outlined'
                fullWidth
                value = { user.email }
                onChange={(e) => setUser({ ...user, email: e.target.value})}
            />
            <TextField
                className={classes.lineSpacing}
                id="Enter password"
                type='password'
                label="Enter password"
                variant='outlined'
                fullWidth
                value = { user.password }
                onChange={(e) => setUser({ ...user, password: e.target.value})}
            />

            <Button 
            className={classes.lineSpacing}
            variant="contained"
            color="primary"
            type="submit"
            >
                Sign Up
            </Button>
        </form>
        </>
     );
}
 
export default SignUp;