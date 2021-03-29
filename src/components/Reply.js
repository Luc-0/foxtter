import React from 'react';
import ReplyCard from './ReplyCard';
import {
  Button,
  FlexContainer,
  HelperText,
  Text,
  Textarea,
} from './StyledComponents';

function Reply({ reply, close }) {
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
        <Textarea placeholder="Fweet your reply" />
        <Button mg="10px" wt="auto" primary>
          Fweet
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}

export default Reply;
