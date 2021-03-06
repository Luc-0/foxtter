import React from 'react';
import {
  Container,
  FlexContainer,
  Icon,
  Input,
  Text,
  Button,
  HelperText,
} from '../components/StyledComponents';

export default function Login() {
  return (
    <Container wt="100vw" ht="100vh">
      <Container wt="25%" mg="0 auto" pd="10px 0">
        <Icon imgUrl="images/foxtter-icon.png" />
        <Text size="2.2em" weight="700" mg="20px 0">
          Log in to Foxtter
        </Text>
        <Container>
          <Text as="label" htmlFor="login-email-username" size="1.3em">
            Email/Username
          </Text>
          <Input id="login-email-username" mg="5px 0" />
        </Container>

        <Container mg="15px 0 20px">
          <Text as="label" htmlFor="login-password" size="1.3em">
            Password
          </Text>
          <Input id="login-password" type="password" mg="5px 0" />
        </Container>

        <Button primary>Log in</Button>
        <FlexContainer jc="space-between" mg="15px 0">
          <HelperText size="1.1em">Forgot password?</HelperText>
          <HelperText size="1.1em">Sign up for Foxtter</HelperText>
        </FlexContainer>
      </Container>
    </Container>
  );
}
