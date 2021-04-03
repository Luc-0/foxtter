import React, { useState } from 'react';
import { connect } from 'react-redux';
import { refweet } from '../redux/actions';

import { HighlightCircle, Icon } from './StyledComponents';

function Refweet({ fweet, ...props }) {
  const [handlingRefweet, setHandlingRefweet] = useState(false);

  return (
    <div>
      <HighlightCircle onClick={handleRefweet} title="Refweet">
        <Icon wt="16px" ht="16px" imgUrl="/images/refweet-icon.png" />
      </HighlightCircle>
    </div>
  );

  function handleRefweet() {
    if (handlingRefweet) {
      return;
    }

    const [userId, fweetId] = [fweet.user.id, fweet.id];
    const fweetContent = { text: '', refweet: fweet };
    props.refweet(props.currentUser, fweetContent, { userId, fweetId });
    setHandlingRefweet(true);
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, { refweet })(Refweet);
