import React from 'react';
import {
  HomeContainer,
  Container,
  FlexContainer,
  Span,
} from '../components/StyledComponents';
import Fweet from '../components/Fweet';
import FweetCard from '../components/FweetCard';
import PageName from '../components/PageName';

export default function Home() {
  return (
    <HomeContainer wt="100%" ht="100%" jc="flex-start" ai="flex-start" column>
      <PageName name="Home" />

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
