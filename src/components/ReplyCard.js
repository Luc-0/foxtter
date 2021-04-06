import React from 'react';

import { formatCardDate } from '../helpers/date';

import ProfilePicture from './ProfilePicture';
import {
  Container,
  FlexContainer,
  Text,
  LightText,
  StyledSvg,
  Span,
  HighlightCircle,
  Icon,
} from './StyledComponents';

function ReplyCard({ reply, to, ...props }) {
  return (
    <Container>
      {reply ? (
        <FlexContainer
          pd="10px"
          className={to ? 'fweet-card' : 'border-up'}
          ai="flex-start"
          column
        >
          {to ? (
            <FlexContainer jc="flex-start">
              <StyledSvg className="reply">
                <line x1="33" y1="0" x2="33" y2="50"></line>
              </StyledSvg>
              <LightText>
                Replying to{' '}
                <Span weight="500">@{to.username || 'username'}</Span>
              </LightText>
            </FlexContainer>
          ) : null}
          <FlexContainer jc="flex-start" ai="flex-start" pd="0 10px">
            <ProfilePicture imgUrl={reply.pictureUrl || ''} />
            <FlexContainer jc="flex-start" column>
              <FlexContainer jc="flex-start">
                <Text weight="600" mg="0 10px">
                  {reply.name || 'name'}
                </Text>
                <LightText>@{reply.username || 'username'}</LightText>

                <LightText mg="0 10px">·</LightText>
                <LightText>
                  {reply.dateCreated
                    ? formatCardDate(reply.dateCreated)
                    : '01m'}
                </LightText>
              </FlexContainer>

              <Container>
                <Text className="break-anywhere" pd="10px">
                  {reply.text || <LightText>Refweet</LightText>}
                </Text>
              </Container>
            </FlexContainer>
          </FlexContainer>
          {props.hideReplyBtn ? null : (
            <FlexContainer>
              <HighlightCircle
                onClick={() => {
                  props.handleReply(reply);
                }}
                title="Reply"
                className="fweet"
              >
                <Icon wt="24px" ht="24px" imgUrl="/images/reply-icon.png" />
              </HighlightCircle>
            </FlexContainer>
          )}
        </FlexContainer>
      ) : null}
    </Container>
  );
}

export default ReplyCard;
