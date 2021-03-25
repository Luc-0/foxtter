import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
import ProfilePicture from '../components/ProfilePicture';

const Fweet = ({ location = { state: { fweet: undefined } }, ...props }) => {
  const [fweet, setFweet] = useState();
  const [hour, setHour] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    if (location.state.fweet) {
      setFweet(location.state.fweet);
    }
  }, [location.state.fweet]);

  useEffect(() => {
    if (fweet) {
      updateTime(fweet.dateCreated);
    }
  }, [fweet]);

  return (
    <div>
      {fweet ? (
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
              {FweetStatus(0, 'Likes')}
            </FlexContainer>
            <Line mg="20px 0 10px" />

            <FlexContainer jc="space-between">
              <HighlightCircle title="Reply" className="fweet">
                <Icon wt="24px" ht="24px" imgUrl="/images/reply-icon.png" />
              </HighlightCircle>
              <HighlightCircle title="Refweet" className="fweet">
                <Icon wt="24px" ht="24px" imgUrl="/images/refweet-icon.png" />
              </HighlightCircle>
              <HighlightCircle title="Like" className="fweet">
                <Icon
                  wt="24px"
                  ht="24px"
                  imgUrl="/images/empty-like-icon.png"
                />
              </HighlightCircle>
            </FlexContainer>
          </FlexContainer>
          <Container className="space-container" />
        </FlexContainer>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );

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

export default Fweet;
