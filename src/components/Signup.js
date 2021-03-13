import React, { useState } from 'react';
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
import { signup, isEmailAlreadyUsed } from '../helpers/auth';
import { validateEmail, validateName } from '../helpers/validation';

export default function Signup(props) {
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

      await signup(email, password, name).catch((error) => {
        setTryAgain(true);
        setTimeout(() => {
          setTryAgain(false);
        }, 5000);
      });
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
    const validFormat = validateEmail(email);
    const isUsed = await isEmailAlreadyUsed(email);
    const validEmail = validFormat && !isUsed;

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
}
