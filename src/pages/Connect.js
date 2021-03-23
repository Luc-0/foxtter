import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadRecommendedUsers } from '../redux/actions';

import {
  Container,
  FlexContainer,
  HighlightCircle,
} from '../components/StyledComponents';
import PageName from '../components/PageName';
import ProfileCard from '../components/ProfileCard';

const Connect = ({ currentUser, users, ...props }) => {
  const initialMaxUsersDisplay = 10;
  const maxDisplay = 30;

  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState();
  const [maxUsersDisplay, setmaxUsersDisplay] = useState(
    initialMaxUsersDisplay
  );
  const [loading, setLoading] = useState(true);

  // On first load, load recommended users if does not have it
  useEffect(() => {
    if (
      currentUser &&
      currentUser.following &&
      props.recommendedUsersId.length === 0
    ) {
      props.loadRecommendedUsers(
        currentUser.id,
        currentUser.following,
        maxDisplay
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update recommended users on rec users id change
  useEffect(() => {
    if (props.recommendedUsersId && props.recommendedUsersId.length > 0) {
      const newRecommendedUsers = [];
      props.recommendedUsersId.forEach((userId) => {
        const user = users[userId];

        if (!user) {
          return;
        }

        newRecommendedUsers.push(user);
      });

      setRecommendedUsers(newRecommendedUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.recommendedUsersId]);

  // Update display if have any recommended users
  useEffect(() => {
    if (recommendedUsers.length > 0) {
      updateDisplayUsers(currentUser, recommendedUsers, maxUsersDisplay);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendedUsers]);

  // Update display on load more users
  useEffect(() => {
    if (
      maxUsersDisplay !== initialMaxUsersDisplay &&
      recommendedUsers.length > 0
    ) {
      updateDisplayUsers(currentUser, recommendedUsers, maxUsersDisplay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxUsersDisplay]);

  return (
    <FlexContainer className="page-container">
      <PageName name="Connect" />
      <Container className="space-container" />

      <FlexContainer className="border-up">
        {loading ? (
          <FlexContainer mg="10px 0">Loading</FlexContainer>
        ) : (
          <Container>
            {displayUsers ? (
              <FlexContainer column>
                {displayUsers.map((user) => (
                  <ProfileCard key={user.id} user={user} />
                ))}
                {maxUsersDisplay < props.recommendedUsersId.length &&
                maxUsersDisplay < maxDisplay ? (
                  <HighlightCircle
                    className="load-more"
                    mg="20px 0"
                    wt="100px"
                    ht="100px"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </HighlightCircle>
                ) : null}
              </FlexContainer>
            ) : (
              <FlexContainer mg="10px 0">Error loading users</FlexContainer>
            )}
          </Container>
        )}
      </FlexContainer>
    </FlexContainer>
  );

  function updateDisplayUsers(currentUser, recommendedUsers, max) {
    const filteredUsers = filterUsers(currentUser, recommendedUsers, max);
    setDisplayUsers(filteredUsers);
  }

  function filterUsers(currentUser, users, max) {
    if (users.length === 0) {
      return;
    }

    const newDisplayUsers = [];
    let count = 0;

    for (let i = 0; i < users.length; i++) {
      if (count === max) {
        break;
      }

      const user = users[i];
      if (currentUser.following.includes(user.id)) {
        continue;
      }

      newDisplayUsers.push(user);
      ++count;
    }

    return newDisplayUsers;
  }

  function handleLoadMore() {
    setmaxUsersDisplay(maxUsersDisplay + 5);
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    users: state.users.all,
    loadError: state.users.loadAllError,
    recommendedUsersId: state.users.recommendedUsersId,
  };
};

export default connect(mapStateToProps, { loadRecommendedUsers })(Connect);
