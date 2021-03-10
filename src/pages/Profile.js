import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../components/ProfilePicture';
import {
  FlexContainer,
  Icon,
  Span,
  LightText,
  BackgroundImage,
  Container,
  Button,
  Text,
  HighlightCircle,
} from '../components/StyledComponents';

export default function Profile(props) {
  return (
    <FlexContainer className="page-container">
      <FlexContainer className="page-title-container">
        <Link to="/home">
          <Icon
            mg="0 10px"
            wt="24px"
            ht="24px"
            imgUrl="images/left-arrow-icon.png"
          />
        </Link>
        <FlexContainer column jc="space-evenly" ai="flex-start" mg="0 20px">
          <Span weight="600">{props.user ? props.user.name : 'Foxtter'}</Span>
          <LightText size="0.8em">
            {props.user ? props.user.fweets.length : '0'} Fweets
          </LightText>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer column jc="flex-start" ai="flex-start">
        {/* Images */}
        <Container wt="100%" ht="200px">
          <BackgroundImage
            className="profile-background"
            alt="header-image"
            src="images/foxtter-landing-page-background.jfif"
          >
            <Container className="profile-page-picture-container">
              <ProfilePicture width="135px" height="135px" border={true} />
            </Container>
          </BackgroundImage>
        </Container>

        {/* Profile buttons */}
        <FlexContainer
          mg="5px 0"
          jc="flex-end"
          ht="50px"
          mht="50px"
          pd="0 16px"
        >
          {/* Current user profile ? */}
          {false ? (
            <Button wt="auto" ht="38px">
              Set up profile
            </Button>
          ) : (
            <FlexContainer wt="auto">
              <HighlightCircle mg="0 10px" border>
                <Icon wt="16px" ht="16px" imgUrl="images/messages-icon.png" />
              </HighlightCircle>

              {/* User follow? */}
              {true ? (
                <Button wt="auto" ht="38px" primary>
                  Following
                </Button>
              ) : (
                <Button wt="auto" ht="38px">
                  Follow
                </Button>
              )}
            </FlexContainer>
          )}
        </FlexContainer>

        {/* User info */}
        <FlexContainer
          column
          jc="space-between"
          ai="flex-start"
          pd="10px 15px"
          ht="100%"
          mht="100px"
        >
          <Container>
            <Text size="1.3em" weight="600">
              {props.user ? props.user.name : 'Foxtter'}
            </Text>
            <LightText mg="5px 0">
              {props.user ? `@${props.user.username}` : '@username'}
            </LightText>
          </Container>

          {/* User has a bio */}
          {true ? (
            <Text mg="10px 0">
              {props.user ? props.user.bio : 'Description'}
            </Text>
          ) : null}

          <FlexContainer jc="flex-start" mg="15px 0">
            <FlexContainer wt="auto">
              <Text as={Link}>
                {props.user ? props.user.following.length : '0'} Following
              </Text>
              <Text mg="0 10px" as={Link}>
                {props.user ? props.user.followers.length : '0'} Followers
              </Text>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        {/* Tabs */}
        <FlexContainer></FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}
