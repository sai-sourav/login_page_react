import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
    if(action.type === 'INPUT'){
      return { value: action.val, isValid: action.val.includes('@')}
    }
    if(action.type === 'VALIDATE'){
      return { value: state.value, isValid: state.value.includes('@')}
    }
    return { value: '', isValid: false}
}

const pswdReducer = (state, action) => {
  if(action.type === 'INPUT'){
    return { value: action.val, isValid: action.val.length > 6}
  }
  if(action.type === 'VALIDATE'){
    return { value: state.value, isValid: state.value.length > 6}
  }
  return { value: '', isValid: false}
}

const collegeReducer = (state, action) => {
  if(action.type === 'INPUT'){
    return { value: action.val, isValid: action.val.length > 6}
  }
  if(action.type === 'VALIDATE'){
    return { value: state.value, isValid: state.value.length > 6}
  }
  return { value: '', isValid: false}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // const [enteredcollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setcollegeIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null})
  const [pswdState, dispatchPswd] = useReducer(pswdReducer, { value: '', isValid: null})
  const [collegestate, dispatchCollege] = useReducer(collegeReducer, { value: '', isValid: null} )

  useEffect(() => {
    const validity = setTimeout(() => {
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollege.trim().length > 3
        emailState.isValid && pswdState.isValid && collegestate.isValid
      );
    }, 500);

    return(() => {
      clearTimeout(validity)});
    
  },[emailState, pswdState, collegestate])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'INPUT', val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPswd({type: 'INPUT', val: event.target.value})
  };

  const collegeChangeHandler = (event) => {
    // setEnteredCollege(event.target.value)
    dispatchCollege({type: 'INPUT', val: event.target.value})
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: 'VALIDATE'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPswd({type: 'VALIDATE'})
  };

  const validatecollegeHandler = () => {
    // setcollegeIsValid(enteredcollege.trim().length > 3);
    dispatchCollege({type: 'VALIDATE'})
  }

  const ctx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    ctx.loginHandler(emailState.value, pswdState.value, collegestate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <Input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pswdState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={pswdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegestate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">CollegeName:</label>
          <Input
            type="text"
            id="college"
            value={collegestate.value}
            onChange={collegeChangeHandler}
            onBlur={validatecollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
