import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import classes from './LogIn.module.css';
import CircleSpinner from '../spinners/CircleSpinner';



const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setErrorMessage('');
  }, [username, password]);

  const logInButtonContent = () => {
    if (!loading) {
      return 'Log In';
    }
    return <CircleSpinner />;
  };

  const loginUser = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:3000/sessions', {
    credentials: 'include',
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username,
    password,
    
  })
})
.then(response => response.json())
.then(data => {
  dispatch({ type: 'LOGIN_STATUS', payload: data });
    if(data.status === 401){
      setErrorMessage('Username/Password Incorrect')
    } else if(data.logged_in){
        setSuccessMessage('Logged in succcessfully')
        console.log(data)
        navigate('/mentors')
      }
    })
  }

  return (
    <section className={classes.sessionForm}>
    <div className={classes.sessionContainer}>
    <p className={classes.errorMsg}>{errorMessage}</p>
    <p className={classes.success}>{successMessage}</p>
        <div className={classes.formContainer}>
        <Form onSubmit={(e) => loginUser(e)} className={classes.form}>
        <div className={classes.heading}>
              <h1>Login</h1>
              </div>
            <div className={classes.formGroup}>
            <Form.Label>Username</Form.Label>
            <br />
            <Form.Control
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            variant="primary"
            type="submit"
            className={classes.submitBtn}
          >
            {logInButtonContent()}
          </Button>
          </Form>
        </div>
        <div>
          <p>
            Don&apos;t have an account yet?
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogIn;