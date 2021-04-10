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
import { updateUserFweets } from '../redux/actions';

import fweet from '../helpers/fweet';

import ProfilePicture from '../components/ProfilePicture';
import TabList from '../components/TabList';
import FollowToggle from '../components/FollowToggle';
import Fweets from '../components/Fweets';
import ProfileSetup from '../components/ProfileSetup';

const Profile = ({
  location = { state: { profileUserId: undefined } },
  currentUser,
  ...props
}) => {
  const [profileUser, setProfileUser] = useState();
  const [profileFweets, setProfileFweets] = useState();
  const [isLoadingFweets, setIsLoadingFweets] = useState(true);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);

  useEffect(() => {
    // Get profile user from link state
    if (location.state.profileUserId) {
      const profileUserId = location.state.profileUserId;
      setProfileFweets(null);
      setProfileUser(null);

      if (profileUserId === currentUser.id) {
        setProfileUser(currentUser);
        setIsLoadingFweets(true);
        return;
      }

      const user = props.allUsers[profileUserId];
      setIsLoadingFweets(true);
      setProfileUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.profileUserId]);

  // On page load, load profile user fweets
  useEffect(() => {
    if (profileUser) {
      if (isLoadingFweets) {
        props.updateUserFweets(profileUser.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser]);

  useEffect(() => {
    if (
      props.updateFweetsSucess &&
      profileUser &&
      props.updateFweetsSucess.userId === profileUser.id
    ) {
      setIsLoadingFweets(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateFweetsSucess]);

  useEffect(() => {
    if (!isLoadingFweets) {
      let user;
      if (currentUser.id === profileUser.id) {
        user = { ...currentUser };
        const updatedFweets = props.allUsers[currentUser.id].fweets;
        user.fweets = updatedFweets;
      } else {
        user = props.allUsers[profileUser.id];
      }

      const userFweets = user.fweets;

      if (!userFweets || Object.keys(userFweets).length === 0) {
        return;
      }

      const fweetsId = Object.keys(userFweets);
      const displayFweets = [];
      fweetsId.forEach((fweetId) => {
        const userFweet = userFweets[fweetId];
        const newFweet = fweet(
          user.id,
          user.name,
          user.username,
          user.pictureUrl,
          fweetId,
          userFweet.text,
          userFweet.dateCreated,
          userFweet.refweets,
          userFweet.replies,
          userFweet.refweet ? userFweet.refweet : null
        );

        displayFweets.push(newFweet);
      });

      setProfileFweets(displayFweets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingFweets]);

  return (
    <div>
      {isProfileSetupOpen ? <ProfileSetup close={closeProfileSetup} /> : null}

      {profileUser ? (
        <FlexContainer className="page-container">
          <FlexContainer className="page-name-container">
            <Link to="/home">
              <Icon
                mg="0 10px"
                wt="24px"
                ht="24px"
                imgUrl="/images/left-arrow-icon.png"
              />
            </Link>
            <FlexContainer column jc="space-evenly" ai="flex-start" mg="0 20px">
              <Span weight="600">
                {profileUser ? profileUser.name : 'Foxtter'}
              </Span>
              <LightText size="0.8em">
                {profileUser && profileFweets ? profileFweets.length : '0'}{' '}
                Fweets
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
                    : '/images/foxtter-landing-page-background.jfif'
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
                <Button onClick={openProfileSetup} wt="auto" ht="38px">
                  Set up profile
                </Button>
              ) : (
                <FlexContainer wt="auto">
                  <HighlightCircle mg="0 10px" border>
                    <Icon
                      wt="16px"
                      ht="16px"
                      imgUrl="/images/messages-icon.png"
                    />
                  </HighlightCircle>
                  <FollowToggle targetUser={profileUser} />
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

              {profileUser && profileUser.description ? (
                <Text mg="10px 0">{profileUser.description}</Text>
              ) : null}

              <FlexContainer jc="flex-start" mg="15px 0">
                <FlexContainer wt="auto">
                  <Text>
                    {profileUser ? profileUser.following.length : '0'} Following
                  </Text>
                  <Text mg="0 10px">
                    {profileUser ? profileUser.followers.length : '0'} Followers
                  </Text>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>

            <TabList
              items={[
                {
                  text: 'Fweets',
                  selected: true,
                },
              ]}
            />
            <FlexContainer mg="10px 0" column>
              {isLoadingFweets ? (
                <div>Loading fweets</div>
              ) : (
                <FlexContainer>
                  {profileFweets ? (
                    <Fweets fweets={profileFweets} />
                  ) : (
                    <div>No fweets yet.</div>
                  )}
                </FlexContainer>
              )}
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );

  function openProfileSetup() {
    setIsProfileSetupOpen(true);
  }
  function closeProfileSetup() {
    setIsProfileSetupOpen(false);
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    allUsers: state.users.all,
    updateFweetsSucess: state.users.updateFweetsSuccess,
  };
};

export default connect(mapStateToProps, { updateUserFweets })(Profile);
