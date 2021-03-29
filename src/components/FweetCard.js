import React from 'react';
import { Link } from 'react-router-dom';

import { formatCardDate } from '../helpers/date';

import LikeToggle from './LikeToggle';
import ProfilePicture from './ProfilePicture';
import {
  Container,
  FlexContainer,
  Icon,
  Text,
  LightText,
  HighlightCircle,
} from './StyledComponents';

export default function FweetCard({ fweet, ...props }) {
  return (
    <FlexContainer
      className="fweet-card"
      as={Link}
      to={
        fweet
          ? {
              pathname: `${fweet.user.username}/status/${fweet.id}`,
              state: {
                fweet: fweet,
              },
            }
          : '/home'
      }
      pd="10px"
      ai="flex-start"
      jc="flex-start"
    >
      <Container wt="auto" ht="100%">
        <ProfilePicture imgUrl={fweet.user.pictureUrl} />
      </Container>
      <FlexContainer
        className="fweet-card-text-container"
        column
        jc="flex-start"
        ai="flex-start"
      >
        <FlexContainer jc="flex-start" ai="flex-start" pd="0 10px">
          <Text weight="600" mg="0 10px 0 0">
            {fweet.user.name || 'name'}
          </Text>
          <LightText>{`@${fweet.user.username}` || '@username'}</LightText>
          <LightText mg="0 10px">·</LightText>
          <LightText>{formatCardDate(fweet.dateCreated) || '01m'}</LightText>
        </FlexContainer>
        <Container pd="10px">
          <Text className="fweet-text">{fweet.text || 'text'}</Text>
        </Container>
        <FlexContainer onClick={preventDefault} jc="space-between" pd="0 20px">
          <HighlightCircle title="Reply">
            <Icon wt="16px" ht="16px" imgUrl="/images/reply-icon.png" />
          </HighlightCircle>
          <HighlightCircle title="Refweet">
            <Icon wt="16px" ht="16px" imgUrl="/images/refweet-icon.png" />
          </HighlightCircle>
          <LikeToggle targetFweet={fweet} iconClass="fweet-card" />
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );

  function preventDefault(e) {
    e.preventDefault();
  }
}
