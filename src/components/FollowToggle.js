import { Container, FlexContainer, Button } from './StyledComponents';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  follow as followActionCreator,
  unfollow as unfollowActionCreator,
} from '../redux/actions';

import { follow, unfollow } from '../helpers/firestore';
import { cleanup } from '@testing-library/react';

const FollowToggle = ({
  currentUser,
  targetUser,
  btnHeight = '32px',
  margin = '',
  ...props
}) => {
  const [following, setFollowing] = useState(false);
  const [handlingFollow, setHandlingFollow] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      updateFollowDisplay(currentUser, targetUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.following]);

  useEffect(() => {
    if (isMounted) {
      updateFollowDisplay(currentUser, targetUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUser]);

  return (
    <Container wt="auto" mg={margin} onClick={handleClick}>
      {currentUser && targetUser ? (
        <FlexContainer>
          {following ? (
            <Button onClick={handleUnfollow} ht={btnHeight} wt="auto" primary>
              Following
            </Button>
          ) : (
            <Button onClick={handleFollow} ht={btnHeight} wt="auto">
              Follow
            </Button>
          )}
        </FlexContainer>
      ) : null}
    </Container>
  );

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleFollow() {
    if (handlingFollow) {
      return;
    }

    setHandlingFollow(true);
    follow(currentUser.id, targetUser.id)
      .then(() => {
        props.followActionCreator(targetUser.id);
        setHandlingFollow(false);
      })
      .catch((error) => {
        console.log('error follow', error);
      });
  }

  function handleUnfollow() {
    if (handlingFollow) {
      return;
    }

    setHandlingFollow(true);

    unfollow(currentUser.id, targetUser.id)
      .then(() => {
        props.unfollowActionCreator(targetUser.id);
        setHandlingFollow(false);
      })
      .catch((error) => {
        console.log('error unfollow', error);
      });
  }

  function isFollowing(following, targetUserId) {
    if (!Array.isArray(following) || !(typeof targetUserId == 'string')) {
      throw TypeError('Invalid arguments');
    }

    if (following.includes(targetUserId)) {
      return true;
    }

    return false;
  }

  function updateFollowDisplay(currentUser, targetUser) {
    if (currentUser && currentUser.following && targetUser) {
      if (isFollowing(currentUser.following, targetUser.id)) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  followActionCreator,
  unfollowActionCreator,
})(FollowToggle);
