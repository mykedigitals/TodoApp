import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import Todos from './components/todos/Todos';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NavBar from './components/navBar/NavBar';
import { Container } from '@material-ui/core';
import { loadUser } from './store/actions/authActions';

import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



const useStyles = makeStyles({
  contentStyle: {
    margin: "30px auto", 
  }
})

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <Container max-width= 'md'>
        <NavBar/>
        <Container className = {classes.contentStyle} max-width= 'sm'>
          <Routes>
            <Route path="/signin" Component={SignIn}/>
            <Route path="/signup" Component={SignUp}/>
            <Route path="/" Component={Todos}/>
          </Routes>
        </Container>
          
      </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
