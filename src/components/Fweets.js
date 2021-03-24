import React from 'react';
import { Container } from './StyledComponents';
import FweetCard from './FweetCard';

export default function Fweets(props) {
  return (
    <Container className="fweets-container">
      {props.fweets
        ? props.fweets.map((fweet) => (
            <FweetCard key={fweet.id} fweet={fweet} />
          ))
        : null}
    </Container>
  );
}
