import React, { useState } from 'react';
import { connect } from 'react-redux';

import ReplyCard from './ReplyCard';
import {
  Button,
  FlexContainer,
  HelperText,
  Text,
  Textarea,
} from './StyledComponents';

import { reply as replyActionCreator } from '../redux/actions';

function Reply({ currentUser, reply, close, ...props }) {
  const [replyText, setReplyText] = useState('');

  return (
    <FlexContainer className="reply" column>
      <FlexContainer ai="flex-start" column>
        <HelperText onClick={close} mg="0 10px" size="1.2em">
          X
        </HelperText>
        <FlexContainer>
          <Text mg="10px 0">Replying to @{reply.username || 'username'}</Text>
        </FlexContainer>

        <ReplyCard reply={reply} />
      </FlexContainer>
      <FlexContainer jc="flex-end">
        <Textarea
          onChange={handleReplyTextChange}
          value={replyText}
          placeholder="Fweet your reply"
        />
        <Button onClick={handleReply} mg="10px" wt="auto" primary>
          Reply
        </Button>
      </FlexContainer>
    </FlexContainer>
  );

  function handleReplyTextChange(e) {
    const value = e.target.value;
    setReplyText(value);
  }

  function handleReply() {
    if (replyText.length <= 3) {
      return;
    }

    const newReply = {
      name: currentUser.name,
      username: currentUser.username,
      text: replyText,
    };

    props.replyActionCreator(
      currentUser.id,
      reply.fweetUserId,
      reply.fweetId,
      newReply
    );
    close();
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, { replyActionCreator })(Reply);
