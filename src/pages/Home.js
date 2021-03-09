import React from 'react';
import {
  HomeContainer,
  Container,
  FlexContainer,
  Icon,
  Text,
  Span,
} from '../components/StyledComponents';
import Fweet from '../components/Fweet';
import FweetCard from '../components/FweetCard';

export default function Home() {
  return (
    <HomeContainer wt="100%" ht="100%" jc="flex-start" ai="flex-start" column>
      <FlexContainer
        display="flex"
        className="page-title-container"
        ht="55px"
        wt="100%"
        jc="flex-start"
      >
        <Span weight="600" size="1.4em" mg="0 20px">
          Home
        </Span>
      </FlexContainer>
      <Container>
        <Fweet />
      </Container>
      <Container className="space-container" />
      <Container className="fweets-container">
        <FweetCard text="First Fweet" />
        <FweetCard />
        <FweetCard />
      </Container>
    </HomeContainer>
  );
}
