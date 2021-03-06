import React, { useState } from 'react';
import {
  Button,
  Container,
  FlexContainer,
  BackgroundImage,
  Title,
  Icon,
} from '../components/StyledComponents';
import { Link } from 'react-router-dom';
import Signup from '../components/Signup';

export default function Landing() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <Container wt="100vw" ht="100vh">
      {signupOpen ? <Signup handleClose={closeSignup} /> : null}
      <FlexContainer>
        <Container wt="120%" ht="100%">
          <BackgroundImage src="/images/foxtter-landing-page-background.jfif" />
        </Container>
        <FlexContainer column jc="space-evenly" ai="start" pd="0 20px">
          <Icon imgUrl="/images/foxtter-icon.png"></Icon>
          <Title size="3.5em">Welcome to Foxtter</Title>
          <Container wt="60%" ht="110px" mg="0 20px">
            <FlexContainer column jc="space-between">
              <Button onClick={openSignup} primary>
                Sign up
              </Button>
              <Button to="/login" as={Link}>
                Log in
              </Button>
            </FlexContainer>
          </Container>
        </FlexContainer>
      </FlexContainer>
    </Container>
  );

  function openSignup() {
    setSignupOpen(true);
  }

  function closeSignup() {
    setSignupOpen(false);
  }
}
