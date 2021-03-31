import React, { useState, useEffect } from 'react';
import ReplyCard from './ReplyCard';

import { sortByDateCreated } from '../helpers/date';

import { FlexContainer, Container } from './StyledComponents';

function Replies({ replies, handleReply }) {
  const [displayReplies, setDisplayReplies] = useState();

  useEffect(() => {
    if (replies) {
      orderReplies(replies);
    }
    // eslint-disable-next-line
  }, [replies]);

  return (
    <FlexContainer column>
      {replies ? (
        <Container>
          {displayReplies
            ? displayReplies.map((reply) => (
                <ReplyCard
                  key={reply.id}
                  handleReply={handleReply}
                  reply={reply}
                  to={reply.to ? reply.to : null}
                />
              ))
            : null}
        </Container>
      ) : (
        <div>Loading</div>
      )}
    </FlexContainer>
  );

  function orderReplies(replies) {
    const childDict = [];
    let parents = [];

    // Get parent and child replies
    replies.forEach((reply) => {
      if (reply.to) {
        const parentId = reply.to.parentId;

        if (Array.isArray(childDict[parentId])) {
          childDict[parentId].push(reply);
        } else {
          childDict[parentId] = [];
          childDict[parentId].push(reply);
        }
        return;
      }

      parents.push(reply);
    });

    const orderedReplies = [];

    parents = sortReplies(parents);

    // If parent has childs, push childs to ordered replies after pushing parent
    parents.forEach((parentReply) => {
      let parentChilds = childDict[parentReply.id];

      if (!parentChilds) {
        orderedReplies.push(parentReply);
        return;
      }

      parentChilds = sortReplies(parentChilds);

      orderedReplies.push(parentReply);
      parentChilds.forEach((child) => orderedReplies.push(child));
    });

    setDisplayReplies(orderedReplies);
  }

  function sortReplies(replies) {
    const sortedReplies = sortByDateCreated(replies);
    return sortedReplies;
  }
}

export default Replies;
