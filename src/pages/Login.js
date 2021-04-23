import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login, clearLoginError } from '../redux/actions';
import { validateEmail } from '../helpers/validation';

import Signup from '../components/Signup';
import {
  Container,
  FlexContainer,
  Icon,
  Input,
  Text,
  Button,
  HelperText,
  WrongBox,
} from '../components/StyledComponents';

const Login = (props) => {
  const [showInvalidLogin, setShowInvalidLogin] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: {
      name: 'email',
      border: false,
      value: '',
    },
    password: {
      name: 'password',
      border: false,
      value: '',
    },
  });

  useEffect(() => {
    props.clearLoginError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleLoginError, [props.loginError]);

  return (
    <Container wt="100vw" ht="100vh">
      {signupOpen ? <Signup handleClose={closeSignup} /> : null}
      <Container
        as="form"
        className="form"
        onSubmit={handleSubmit}
        mg="0 auto"
        pd="10px 0"
      >
        <Icon imgUrl="/images/foxtter-icon.png" />
        <Text size="2.2em" weight="700" mg="20px 0">
          Log in to Foxtter
        </Text>
        {showInvalidLogin ? (
          <WrongBox mg="15px 0">Invalid email or password.</WrongBox>
        ) : null}
        <Container>
          <Text as="label" htmlFor="login-email" size="1.3em">
            Email
          </Text>
          <Input
            onFocus={() => {
              hideBorder();
            }}
            name={loginForm.email.name}
            value={loginForm.email.value}
            border={loginForm.email.border}
            onChange={handleInputChange}
            id="login-email"
            mg="5px 0"
          />
        </Container>

        <Container mg="15px 0 20px">
          <Text as="label" htmlFor="login-password" size="1.3em">
            Password
          </Text>
          <Input
            onFocus={() => {
              hideBorder();
            }}
            name={loginForm.password.name}
            value={loginForm.password.value}
            border={loginForm.password.border}
            onChange={handleInputChange}
            id="login-password"
            type="password"
            mg="5px 0"
          />
        </Container>

        <Button primary>Log in</Button>
        <FlexContainer jc="space-between" mg="15px 0">
          <HelperText size="1.1em">Forgot password?</HelperText>
          <HelperText onClick={openSignup} size="1.1em">
            Sign up for Foxtter
          </HelperText>
        </FlexContainer>
      </Container>
    </Container>
  );

  function handleSubmit(e) {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    if (!validateEmail(email)) {
      showBorder();
      return;
    }

    props.clearLoginError();
    props.login(email, password);
  }

  function openSignup() {
    setSignupOpen(true);
  }

  function closeSignup() {
    setSignupOpen(false);
  }

  function handleInputChange(e) {
    const inputName = e.target.name;
    let inputValue = e.target.value;

    setLoginForm({
      ...loginForm,
      [inputName]: {
        ...loginForm[inputName],
        value: inputValue,
      },
    });
  }

  function handleLoginError() {
    if (props.loginError) {
      showBorder();
      setShowInvalidLogin(true);
    }
  }

  function showBorder() {
    updateBorder(loginForm.email.name, true);
    updateBorder(loginForm.password.name, true);
  }

  function hideBorder() {
    updateBorder(loginForm.email.name, false);
    updateBorder(loginForm.password.name, false);
  }

  function updateBorder(inputName, border) {
    setLoginForm((prevLoginForm) => {
      return {
        ...prevLoginForm,
        [inputName]: {
          ...prevLoginForm[inputName],
          border: border,
        },
      };
    });
  }
};

const mapStateToProps = (state) => {
  return {
    loginError: state.auth.loginError,
  };
};

export default connect(mapStateToProps, { login, clearLoginError })(Login);
