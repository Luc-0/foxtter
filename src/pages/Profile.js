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

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ProfilePicture from '../components/ProfilePicture';
import TabList from '../components/TabList';

const Profile = ({ currentUser, ...props }) => {
  const location = useLocation();
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    // Get profile user from link state
    setProfileUser(props.location.state.profileUser);
  }, []);

  return (
    <div>
      {profileUser ? (
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
              <Span weight="600">
                {profileUser ? profileUser.name : 'Foxtter'}
              </Span>
              <LightText size="0.8em">
                {profileUser ? profileUser.fweets.length : '0'} Fweets
              </LightText>
            </FlexContainer>
          </FlexContainer>

          <FlexContainer column jc="flex-start" ai="flex-start">
            {/* Images */}
            <Container wt="100%" ht="200px">
              <BackgroundImage
                className="profile-background"
                alt="header-image"
                src={
                  profileUser.backgroundUrl
                    ? profileUser.backgroundUrl
                    : 'images/foxtter-landing-page-background.jfif'
                }
              >
                <Container className="profile-page-picture-container">
                  <ProfilePicture
                    imgUrl={profileUser.pictureUrl}
                    width="135px"
                    height="135px"
                    border={true}
                  />
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
              {currentUser.id === profileUser.id ? (
                <Button wt="auto" ht="38px">
                  Set up profile
                </Button>
              ) : (
                <FlexContainer wt="auto">
                  <HighlightCircle mg="0 10px" border>
                    <Icon
                      wt="16px"
                      ht="16px"
                      imgUrl="images/messages-icon.png"
                    />
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
                  {profileUser ? profileUser.name : 'Foxtter'}
                </Text>
                <LightText mg="5px 0">
                  {profileUser ? `@${profileUser.username}` : '@username'}
                </LightText>
              </Container>

              {/* User has a bio */}
              {true ? (
                <Text mg="10px 0">{profileUser ? profileUser.bio : ''}</Text>
              ) : null}

              <FlexContainer jc="flex-start" mg="15px 0">
                <FlexContainer wt="auto">
                  <Text as={Link}>
                    {profileUser ? profileUser.following.length : '0'} Following
                  </Text>
                  <Text mg="0 10px" as={Link}>
                    {profileUser ? profileUser.followers.length : '0'} Followers
                  </Text>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>

            <Router>
              <TabList
                items={[
                  {
                    text: 'Fweets',
                    to: `${location.pathname}`,
                    selected: true,
                  },
                  {
                    text: 'Fweets & Replies',
                    to: `${location.pathname}/with_replies`,
                  },
                  { text: 'Likes', to: `${location.pathname}/likes` },
                ]}
              />
              <FlexContainer>
                <Switch>
                  <Route
                    exact
                    path={`${location.pathname}`}
                    component={() => <div>Fweets</div>}
                  />
                  <Route
                    exact
                    path={`${location.pathname}/with_replies`}
                    component={() => <div>Fweets replies</div>}
                  />
                  <Route
                    exact
                    path={`${location.pathname}/likes`}
                    component={() => <div>No likes yet</div>}
                  />
                </Switch>
              </FlexContainer>
            </Router>
          </FlexContainer>
        </FlexContainer>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
