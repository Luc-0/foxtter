import React from 'react';
import { connect } from 'react-redux';

import ProfilePicture from './ProfilePicture';
import {
  BackgroundImage,
  FlexContainer,
  Container,
  Button,
  Text,
  Input,
  Textarea,
} from './StyledComponents';

function ProfileSetup({ currentUser }) {
  return (
    <FlexContainer className="profile-setup-container" column>
      <div>
        <Text weight="500" size="1.3em">
          Set up Profile
        </Text>
      </div>
      <Container mg="10px 0" wt="100%" ht="200px">
        <BackgroundImage
          className="profile-background"
          alt="header-image"
          src={
            currentUser.backgroundUrl
              ? currentUser.backgroundUrl
              : '/images/foxtter-landing-page-background.jfif'
          }
        >
          <Container className="profile-page-picture-container">
            <ProfilePicture
              imgUrl={currentUser.pictureUrl}
              width="135px"
              height="135px"
              border={true}
            />
          </Container>
        </BackgroundImage>
      </Container>

      <FlexContainer mg="10px 0" jc="flex-end">
        <Button wt="auto">Change picture</Button>
        <Button mg="0 5px" wt="auto">
          Change background
        </Button>
      </FlexContainer>

      <FlexContainer mg="10px 0" column>
        <Container>
          <Text
            as="label"
            htmlFor="profile-setup-name"
            size="1.1em"
            weight="500"
            mg="5px 0"
          >
            Name
          </Text>
          <Input id="profile-setup-name" />
        </Container>
        <Container mg="10px">
          <Text
            as="label"
            htmlFor="profile-setup-description"
            size="1.1em"
            weight="500"
            mg="5px 0"
          >
            Description
          </Text>
          <Textarea id="profile-setup-description" className="profile-setup" />
        </Container>
      </FlexContainer>

      <FlexContainer jc="flex-end">
        <Button wt="auto">Cancel</Button>
        <Button wt="auto" mg="0 10px" primary>
          Save
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(ProfileSetup);
