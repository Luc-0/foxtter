import React from 'react';

import { FlexContainer, Text, LightText, Button } from './StyledComponents';
import ProfilePicture from './ProfilePicture';

export default function ProfileCard({ user }) {
  return (
    <FlexContainer className="profile-card" jc="flex-start" pd="0 10px">
      <ProfilePicture imgUrl={user ? user.profilePictureUrl : undefined} />
      <FlexContainer wt="auto" column jc="center" pd="0 10px">
        <Text weight="600" mg="5px 0">
          {user ? user.name : 'Foxtter'}
        </Text>
        <LightText>{user ? user.username : '@foxtter'}</LightText>
      </FlexContainer>
      {/* following ? */}
      {true ? (
        <Button ht="32px" wt="auto" mg="0 0 0 auto" primary>
          Following
        </Button>
      ) : (
        <Button ht="32px" wt="auto" mg="0 0 0 auto">
          Follow
        </Button>
      )}
    </FlexContainer>
  );
}
