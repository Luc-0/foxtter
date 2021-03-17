import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAllUsers } from '../redux/actions';

import {
  Container,
  FlexContainer,
  HighlightCircle,
} from '../components/StyledComponents';
import PageName from '../components/PageName';
import ProfileCard from '../components/ProfileCard';

const Connect = ({ currentUser, users, ...props }) => {
  const initialMaxUsersDisplay = 10;
  const maxDisplay = 50;

  const [displayUsers, setDisplayUsers] = useState();
  const [maxUsersDisplay, setmaxUsersDisplay] = useState(
    initialMaxUsersDisplay
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!users) {
      console.log('load all users');
      props.loadAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users) {
      setLoading(false);
      updateDisplayUsers(currentUser, users, maxUsersDisplay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (maxUsersDisplay !== initialMaxUsersDisplay) {
      updateDisplayUsers(currentUser, users, maxUsersDisplay);
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
                {maxUsersDisplay < users.length &&
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

  function updateDisplayUsers(currentUser, users, max) {
    const filteredUsers = filterUsers(currentUser, users, max);
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
  };
};

export default connect(mapStateToProps, { loadAllUsers })(Connect);
