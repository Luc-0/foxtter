import React from 'react';
import {
  Container,
  FlexContainer,
  TransparentBackground,
  Button,
  Input,
  Text,
  Icon,
} from './StyledComponents';

export default function Signup(props) {
  return (
    <TransparentBackground wt="100vw" ht="100vh">
      <FlexContainer id="signup-background" onClick={closeSignup}>
        <Container wt="40%" ht="500px" bgc="#fff" br="20px" pd="2%">
          <Icon imgUrl="images/foxtter-icon.png" mg="0 auto" />
          <Text size="1.6em" weight="700" mg="15px 0">
            Create your account
          </Text>
          <Container mg="0 0 20px">
            <Text as="label" htmlFor="signup-name" size="1.3em">
              Name
            </Text>
            <Input id="signup-name" mg="10px 0" />
          </Container>
          <Container mg="0 0 20px">
            <Text as="label" htmlFor="signup-email" size="1.3em">
              Email
            </Text>
            <Input type="email" id="signup-email" mg="10px 0" />
          </Container>
          <Container mg="0 0 20px">
            <Text as="label" htmlFor="signup-password" size="1.3em">
              Password
            </Text>
            <Input id="signup-password" type="password" mg="10px 0" />
          </Container>
          <Button weight="700" primary>
            Create Account
          </Button>
        </Container>
      </FlexContainer>
    </TransparentBackground>
  );

  function closeSignup(e) {
    if (e.target.id === 'signup-background') {
      props.handleClose();
    }
  }
}
