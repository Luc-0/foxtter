import React from 'react';
import ProfilePicture from './ProfilePicture';
import {
  Container,
  FlexContainer,
  Icon,
  Text,
  LightText,
  HighlightCircle,
} from './StyledComponents';

export default function FweetCard(props) {
  return (
    <FlexContainer
      className="fweet-card"
      pd="10px"
      ai="flex-start"
      jc="flex-start"
    >
      <Container wt="auto" ht="100%">
        <ProfilePicture />
      </Container>
      <FlexContainer
        className="fweet-card-text-container"
        column
        jc="flex-start"
        ai="flex-start"
      >
        <FlexContainer jc="flex-start" ai="flex-start" pd="0 10px">
          <Text weight="600" mg="0 10px 0 0">
            {props.name || 'Name'}
          </Text>
          <LightText>{props.username || '@username'}</LightText>
          <LightText mg="0 10px">·</LightText>
          <LightText>{props.time || '00m'}</LightText>
        </FlexContainer>
        <Container pd="10px">
          <Text className="fweet-text">{props.text || 'text'}</Text>
        </Container>
        <FlexContainer jc="space-between" pd="0 20px">
          <HighlightCircle title="Reply">
            <Icon wt="16px" ht="16px" imgUrl="images/reply-icon.png" />
          </HighlightCircle>
          <HighlightCircle title="Refweet">
            <Icon wt="16px" ht="16px" imgUrl="images/refweet-icon.png" />
          </HighlightCircle>
          <HighlightCircle title="Like">
            <Icon wt="16px" ht="16px" imgUrl="images/empty-like-icon.png" />
          </HighlightCircle>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}
