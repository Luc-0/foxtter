import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/actions';

import {
  Container,
  FlexContainer,
  TransparentBackground,
  Button,
  Input,
  Text,
  Icon,
  AlertMessage,
} from './StyledComponents';
import { isEmailAlreadyUsed } from '../helpers/auth';
import { validateEmail, validateName } from '../helpers/validation';

const Signup = (props) => {
  useEffect(() => {
    if (props.signupError) {
      const timeoutAlert = showAlert(10000);

      return function cleanup() {
        clearTimeout(timeoutAlert);
      };
    }

    function showAlert(ms) {
      setTryAgain(true);
      const timeout = setTimeout(() => {
        setTryAgain(false);
      }, ms);

      return timeout;
    }
  }, [props.signupError]);

  const [signupForm, setSignupForm] = useState({
    name: {
      name: 'name',
      border: false,
      valid: false,
      value: '',
    },
    email: {
      name: 'email',
      border: false,
      valid: false,
      value: '',
    },
    password: {
      name: 'password',
      border: false,
      valid: false,
      value: '',
    },
  });
  const [tryAgain, setTryAgain] = useState(false);

  return (
    <TransparentBackground wt="100vw" ht="100vh">
      <FlexContainer id="signup-background" onClick={closeSignup}>
        <Container as="form" wt="40%" ht="500px" bgc="#fff" br="20px" pd="2%">
          <Icon imgUrl="images/foxtter-icon.png" mg="0 auto" />
          <Text size="1.6em" weight="700" mg="15px 0">
            Create your account
          </Text>
          <Container mg="0 0 20px">
            <Text as="label" htmlFor="signup-name" size="1.3em">
              Name
            </Text>
            <Input
              id="signup-name"
              name={signupForm.name.name}
              onChange={handleInputChange}
              value={signupForm.name.value}
              valid={signupForm.name.valid}
              border={signupForm.name.border}
              required
              mg="10px 0"
            />
          </Container>
          <Container mg="0 0 20px">
            <Text as="label" htmlFor="signup-email" size="1.3em">
              Email
            </Text>
            <Input
              type="text"
              id="signup-email"
              name={signupForm.email.name}
              onChange={handleInputChange}
              value={signupForm.email.value}
              valid={signupForm.email.valid}
              border={signupForm.email.border}
              required
              mg="10px 0"
            />
          </Container>
          <Container mg="0 0 20px">
            <Text as="label" htmlFor="signup-password" size="1.3em">
              Password
            </Text>
            <Input
              id="signup-password"
              type="password"
              name={signupForm.password.name}
              onChange={handleInputChange}
              value={signupForm.password.value}
              valid={signupForm.password.valid}
              border={signupForm.password.border}
              mg="10px 0"
            />
          </Container>
          <Button onClick={handleSubmit} weight="700" primary>
            Create Account
          </Button>
        </Container>
      </FlexContainer>
      {tryAgain ? (
        <AlertMessage>
          Oops, something went wrong, please try again.
        </AlertMessage>
      ) : null}
    </TransparentBackground>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = await validationCheck();

    if (isValid) {
      const name = formatSpace(signupForm.name.value);
      const email = formatSpace(signupForm.email.value);
      const password = signupForm.password.value;

      props.signup(email, password, name);
    }
  }

  function handleInputChange(e) {
    const inputName = e.target.name;
    let inputValue = e.target.value;

    setSignupForm({
      ...signupForm,
      [inputName]: {
        ...signupForm[inputName],
        value: inputValue,
        border: false,
      },
    });
  }

  async function validationCheck() {
    const name = formatSpace(signupForm.name.value);
    const email = formatSpace(signupForm.email.value);
    const password = signupForm.password.value;

    const validName = validateName(name);
    const validEmailFormat = validateEmail(email);
    let isUsed = false;

    if (validEmailFormat) {
      isUsed = await isEmailAlreadyUsed(email);
    }
    const validEmail = validEmailFormat && !isUsed;

    const validPassword = password.length >= 6;

    if (validName) {
      updateInput(signupForm.name.name, true);
    } else {
      updateInput(signupForm.name.name, false);
    }

    if (validEmail) {
      updateInput(signupForm.email.name, true);
    } else {
      updateInput(signupForm.email.name, false);
    }

    if (validPassword) {
      updateInput(signupForm.password.name, true);
    } else {
      updateInput(signupForm.password.name, false);
    }

    return validName && validEmail && validPassword;
  }

  function updateInput(inputName, isValid) {
    if (isValid) {
      setSignupForm((prevSignupForm) => {
        return {
          ...prevSignupForm,
          [inputName]: {
            ...prevSignupForm[inputName],
            border: true,
            valid: true,
          },
        };
      });
    } else {
      setSignupForm((prevSignupForm) => {
        return {
          ...prevSignupForm,
          [inputName]: {
            ...prevSignupForm[inputName],
            border: true,
            valid: false,
          },
        };
      });
    }
  }

  function formatSpace(str) {
    if (typeof str !== 'string') {
      return '';
    }

    return str.replace(/\s+/g, ' ').trim();
  }

  function closeSignup(e) {
    if (e.target.id === 'signup-background') {
      props.handleClose();
    }
  }
};

const mapStateToProps = (state) => {
  return {
    signupError: state.auth.signupError,
  };
};

export default connect(mapStateToProps, { signup })(Signup);
