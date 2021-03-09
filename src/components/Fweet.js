import React from 'react';
import ProfilePicture from './ProfilePicture';
import { FlexContainer, Container, Button, Textarea } from './StyledComponents';

export default function Fweet() {
  return (
    <FlexContainer className="fweet-container" column>
      <FlexContainer>
        <Container ht="100%" wt="auto" pd="20px">
          <ProfilePicture />
        </Container>
        <Container pd="0 15px 0 0">
          <Textarea placeholder="What's happening ?" />
        </Container>
      </FlexContainer>
      <FlexContainer jc="flex-end">
        <Button mg="10px 20px" ht="38px" wt="auto" primary>
          Fweet
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}
