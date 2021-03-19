import {
  FlexContainer,
  Container,
  Button,
  Textarea,
  WrongBox,
} from './StyledComponents';
import ProfilePicture from './ProfilePicture';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addFweet } from '../redux/actions';

const Fweet = ({ currentUser, addFweet }) => {
  const [text, setText] = useState('');
  const [isInvalidFweet, setIsInvalidFweet] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');

  return (
    <FlexContainer className="fweet-container" column>
      <FlexContainer column>
        <FlexContainer>
          <Container ht="100%" wt="auto" pd="20px">
            <ProfilePicture imgUrl={currentUser.pictureUrl} />
          </Container>
          <Container pd="0 15px 0 0">
            <Textarea
              placeholder="What's happening ?"
              value={text}
              onChange={handleTextChange}
            />
          </Container>
        </FlexContainer>
        {isInvalidFweet ? (
          <WrongBox wt="auto">{invalidMessage}</WrongBox>
        ) : null}
      </FlexContainer>
      <FlexContainer jc="flex-end">
        <Button
          onClick={handleFweet}
          mg="10px 20px"
          ht="38px"
          wt="auto"
          primary
        >
          Fweet
        </Button>
      </FlexContainer>
    </FlexContainer>
  );

  function handleFweet() {
    const trimmedText = text.trim();

    if (trimmedText.length < 4 || trimmedText.length > 100) {
      setInvalidMessage('Fweet should be between 4 and 100 characters');
      setIsInvalidFweet(true);
      return;
    }

    setIsInvalidFweet(false);
    addFweet(currentUser, { text: text });
    setText('');
  }

  function handleTextChange(e) {
    const newText = e.target.value;

    setText(newText);
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, { addFweet })(Fweet);
