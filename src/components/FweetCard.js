import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openReply, closeReply } from '../redux/actions';

import { formatCardDate } from '../helpers/date';

import LikeToggle from './LikeToggle';
import Refweet from './Refweet';
import ProfilePicture from './ProfilePicture';
import {
  Container,
  FlexContainer,
  Icon,
  Text,
  LightText,
  HighlightCircle,
} from './StyledComponents';
import Reply from './Reply';
import reply from '../helpers/reply';

function FweetCard({ fweet, ...props }) {
  const [fweetReply, setFweetReply] = useState();

  useEffect(() => {
    return function cleanUp() {
      props.closeReply();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <FlexContainer
      className="fweet-card"
      as={Link}
      to={
        fweet
          ? {
              pathname: `/${fweet.user.username}/status/${fweet.id}`,
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
      {props.isReplyOpen && fweetReply ? (
        <Reply close={handleCloseReply} reply={fweetReply} />
      ) : null}

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
          {fweet.refweet ? (
            <Container>
              <LightText>Refweet</LightText>
              <FweetCard
                isReplyOpen={props.isReplyOpen}
                openReply={props.openReply}
                closeReply={props.closeReply}
                fweet={fweet.refweet}
              />
            </Container>
          ) : (
            <Text className="fweet-text">{fweet.text || ''}</Text>
          )}
        </Container>

        {props.refweetCard ? null : (
          <FlexContainer
            onClick={preventDefault}
            jc="space-between"
            pd="0 20px"
          >
            <HighlightCircle onClick={handleFweetReply} title="Reply">
              <Icon wt="16px" ht="16px" imgUrl="/images/reply-icon.png" />
            </HighlightCircle>

            {fweet.refweet ? null : <Refweet fweet={fweet} />}

            <LikeToggle targetFweet={fweet} iconClass="fweet-card" />
          </FlexContainer>
        )}
      </FlexContainer>
    </FlexContainer>
  );

  function preventDefault(e) {
    e.preventDefault();
  }

  function handleFweetReply() {
    if (props.isReplyOpen) {
      return;
    }

    const fweetId = fweet.id;
    const fweetUserId = fweet.user.id;
    const name = fweet.user.name;
    const username = fweet.user.username;
    const pictureUrl = fweet.user.pictureUrl;
    const text = fweet.text;
    const dateCreated = fweet.dateCreated;

    const fweetReply = reply(
      fweetId,
      fweetUserId,
      name,
      username,
      pictureUrl,
      text,
      dateCreated
    );

    setFweetReply(fweetReply);
    props.openReply();
  }

  function handleCloseReply() {
    setFweetReply(null);
    props.closeReply();
  }
}

const mapStateToProps = (state) => {
  return {
    isReplyOpen: state.UI.isReplyOpen,
  };
};

export default connect(mapStateToProps, { openReply, closeReply })(FweetCard);
