import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { listenFweetUpdate } from '../helpers/firestore';
import { updateFweet } from '../redux/actions';

import reply from '../helpers/reply';

import {
  Container,
  FlexContainer,
  Span,
  Icon,
  LightText,
  Text,
  Line,
  HighlightCircle,
} from '../components/StyledComponents';
import LikeToggle from '../components/LikeToggle';
import ProfilePicture from '../components/ProfilePicture';
import Reply from '../components/Reply';
import Replies from '../components/Replies';

const Fweet = ({
  location = { state: { fweet: undefined } },
  currentUser,
  ...props
}) => {
  const [fweet, setFweet] = useState();
  const [hour, setHour] = useState();
  const [date, setDate] = useState();
  const [currentReply, setCurrentReply] = useState();
  const [openReply, setOpenReply] = useState(false);

  useEffect(() => {
    if (location.state.fweet) {
      const locationFweet = location.state.fweet;
      setFweet(locationFweet);

      let unsub;
      try {
        unsub = listenFweetUpdate(
          locationFweet.user.id,
          locationFweet.id,
          props.updateFweet
        );
      } catch (error) {
        console.log(error);
      }

      return function cleanup() {
        if (unsub) {
          unsub();
        }
      };
    }
    // eslint-disable-next-line
  }, [location.state.fweet]);

  useEffect(() => {
    if (props.all && fweet) {
      const user = props.all[fweet.user.id];
      const updatedFweet = user.fweets[fweet.id];

      if (!user || !updatedFweet) {
        return;
      }

      const newFweet = { ...fweet, ...updatedFweet };
      setFweet(newFweet);
    }
    // eslint-disable-next-line
  }, [props.all]);

  useEffect(() => {
    if (fweet) {
      updateTime(fweet.dateCreated);
    }
  }, [fweet]);

  return (
    <div>
      {fweet ? (
        <FlexContainer className="page-container relative">
          {openReply && currentReply ? (
            <Reply reply={currentReply} close={handleCloseReply} />
          ) : null}
          <FlexContainer className="page-name-container">
            <Link to="/home">
              <Icon
                mg="0 10px"
                wt="24px"
                ht="24px"
                imgUrl="/images/left-arrow-icon.png"
              />
            </Link>
            <FlexContainer column ai="flex-start" mg="0 20px">
              <Span weight="600" size="1.5em">
                Fweet
              </Span>
            </FlexContainer>
          </FlexContainer>

          <FlexContainer
            jc="flex-start"
            ai="flex-start"
            mg="10px 0"
            pd="15px"
            column
          >
            <FlexContainer ai="flex-start" jc="space-evenly">
              <Container wt="auto">
                <ProfilePicture imgUrl={fweet.user.pictureUrl} />
              </Container>
              <FlexContainer
                pd="0 10px"
                ai="flex-start"
                jc="space-evenly"
                column
              >
                <Link
                  to={{
                    pathname: `/${fweet.user.username}`,
                    state: {
                      profileUserId: fweet.user.id,
                    },
                  }}
                >
                  <Span weight="500" size="1.3em">
                    {fweet.user.name}
                  </Span>
                </Link>

                <LightText mg="5px 0">@{fweet.user.username}</LightText>
              </FlexContainer>
            </FlexContainer>

            <FlexContainer jc="flex-start" mg="20px 0">
              <Text size="1.2em">{fweet.text}</Text>
            </FlexContainer>

            <FlexContainer jc="flex-start">
              <LightText>{hour}</LightText>
              <LightText mg="0 10px">·</LightText>
              <LightText>{date}</LightText>
            </FlexContainer>
            <Line mg="20px 0" />

            <FlexContainer jc="flex-start">
              {FweetStatus(
                fweet.refweets ? fweet.refweets.length : 0,
                'Refweets'
              )}
              {FweetStatus(fweet.likes ? fweet.likes : 0, 'Likes')}
            </FlexContainer>
            <Line mg="20px 0 10px" />

            <FlexContainer jc="space-between">
              <HighlightCircle
                onClick={handleFweetReply}
                title="Reply"
                className="fweet"
              >
                <Icon wt="24px" ht="24px" imgUrl="/images/reply-icon.png" />
              </HighlightCircle>
              <HighlightCircle title="Refweet" className="fweet">
                <Icon wt="24px" ht="24px" imgUrl="/images/refweet-icon.png" />
              </HighlightCircle>
              <LikeToggle
                targetFweet={fweet}
                circleClass="fweet"
                iconClass="fweet"
              />
            </FlexContainer>
          </FlexContainer>
          <Container className="space-container" />
          {fweet.replies ? (
            <Replies handleReply={handleReply} replies={fweet.replies} />
          ) : (
            <FlexContainer mg="10px">
              <Text>No replies</Text>
            </FlexContainer>
          )}
        </FlexContainer>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );

  function handleCloseReply() {
    setOpenReply(false);
    setCurrentReply(undefined);
  }

  function handleOpenReply(reply) {
    setOpenReply(true);
    setCurrentReply(reply);
  }

  function handleReply(targetReply) {
    const fweetId = fweet.id;
    const fweetUserId = fweet.user.id;
    const name = targetReply.name;
    const username = targetReply.username;
    const replyUserId = targetReply.userId;
    const pictureUrl = '';
    const text = targetReply.text;
    const dateCreated = targetReply.dateCreated;

    // If it is already a child reply, set parent id to child parent id
    const to = targetReply.to
      ? {
          parentId: targetReply.to.parentId,
          userId: replyUserId,
          username: username,
        }
      : {
          parentId: targetReply.id,
          userId: replyUserId,
          username: username,
        };

    const replyCard = reply(
      fweetId,
      fweetUserId,
      name,
      username,
      pictureUrl,
      text,
      dateCreated,
      to
    );

    handleOpenReply(replyCard);
  }

  function handleFweetReply() {
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

    handleOpenReply(fweetReply);
  }

  function updateTime(createdDate) {
    if (!createdDate) {
      setHour('hh:mm');
      setDate('dd/mm/yyyy');
      return;
    }

    const fweetDate = createdDate.toDate();
    const newDate = new Date(fweetDate);

    let hour = newDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = newDate.toLocaleDateString([], dateOptions);

    setHour(hour);
    setDate(date);
  }

  function FweetStatus(number, text) {
    return (
      <Container wt="auto" mg="0 5px">
        <Span size="1.1em" weight="600" mg="0 10px">
          {number}
        </Span>
        <LightText as={Span} size="1.1em">
          {text}
        </LightText>
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    all: state.users.all,
  };
};

export default connect(mapStateToProps, { updateFweet })(Fweet);
