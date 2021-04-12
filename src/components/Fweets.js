import React from 'react';

import { Container } from './StyledComponents';
import FweetCard from './FweetCard';

import { sortByDateCreated } from '../helpers/date';

export default function Fweets(props) {
  return (
    <Container className="fweets-container">
      {props.fweets
        ? sortByDateCreated(props.fweets)
            .map((fweet) => <FweetCard key={fweet.id} fweet={fweet} />)
            .reverse()
        : null}
    </Container>
  );
}
