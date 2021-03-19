import React from 'react';
import { Link } from 'react-router-dom';

import { FlexContainer, Text, LightText } from './StyledComponents';
import ProfilePicture from './ProfilePicture';
import FollowToggle from './FollowToggle';

export default function ProfileCard({ user }) {
  return (
    <FlexContainer
      as={Link}
      to={{
        pathname: `${user ? user.username : '/home'}`,
        state: {
          profileUser: user,
        },
      }}
      className="profile-card"
      jc="flex-start"
      pd="0 10px"
    >
      <ProfilePicture imgUrl={user ? user.pictureUrl : ''} />
      <FlexContainer wt="auto" column jc="center" ai="start" pd="0 10px">
        <Text weight="600" mg="5px 0">
          {user ? user.name : 'Foxtter'}
        </Text>
        <LightText>{user ? `@${user.username}` : '@foxtter'}</LightText>
      </FlexContainer>
      {user ? <FollowToggle targetUser={user} margin="0 0 0 auto" /> : null}
    </FlexContainer>
  );
}
