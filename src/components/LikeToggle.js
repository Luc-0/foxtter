import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { HighlightCircle, Icon } from './StyledComponents';

import {
  like as likeActionCreator,
  unlike as unlikeActionCreator,
} from '../redux/actions';
import { like, unlike } from '../helpers/firestore';

function LikeToggle({
  currentUser,
  targetFweet,
  iconClass = '',
  circleClass = '',
  ...props
}) {
  const [liked, setLiked] = useState(false);
  const [handlingLike, setHandlingLike] = useState(false);

  useEffect(() => {
    updateLike(currentUser, targetFweet);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateLike(currentUser, targetFweet);
    // eslint-disable-next-line
  }, [currentUser.likes]);

  return (
    <div>
      {liked ? (
        <HighlightCircle
          onClick={handleUnlike}
          title="Unlike"
          className={circleClass}
        >
          <Icon className={iconClass} imgUrl="/images/filled-like-icon.png" />
        </HighlightCircle>
      ) : (
        <HighlightCircle
          onClick={handleLike}
          title="Like"
          className={circleClass}
        >
          <Icon className={iconClass} imgUrl="/images/empty-like-icon.png" />
        </HighlightCircle>
      )}
    </div>
  );

  function updateLike(currentUser, targetFweet) {
    if (!currentUser || !targetFweet) {
      return;
    }

    try {
      const likes = currentUser.likes;
      const targetUserId = targetFweet.user.id;
      const targetFweetId = targetFweet.id;
      const likeId = targetUserId + targetFweetId;

      if (!likes.includes(likeId)) {
        setLiked(false);
        return;
      }

      setLiked(true);
    } catch (error) {
      console.log('Error updating like', error);
    }
  }

  function handleLike() {
    if (handlingLike) {
      return;
    }

    setHandlingLike(true);

    try {
      const targetId = targetFweet.user.id;
      const fweetId = targetFweet.id;
      const likeId = targetId + fweetId;

      like(currentUser.id, targetId, fweetId, likeId).then(() => {
        setHandlingLike(false);
        props.likeActionCreator(likeId);
      });
    } catch (error) {
      setHandlingLike(false);
      console.log('error liking', error);
    }
  }

  function handleUnlike() {
    if (handlingLike) {
      return;
    }

    setHandlingLike(true);

    try {
      const targetId = targetFweet.user.id;
      const fweetId = targetFweet.id;
      const likeId = targetId + fweetId;

      unlike(currentUser.id, targetId, fweetId, likeId).then(() => {
        setHandlingLike(false);
        props.unlikeActionCreator(likeId);
      });
    } catch (error) {
      setHandlingLike(false);
      console.log('error liking', error);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  likeActionCreator,
  unlikeActionCreator,
})(LikeToggle);
