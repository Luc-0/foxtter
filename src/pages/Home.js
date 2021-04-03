import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../redux/actions';

import fweet from '../helpers/fweet';

import { HomeContainer, Container } from '../components/StyledComponents';
import Fweet from '../components/Fweet';
import PageName from '../components/PageName';
import Fweets from '../components/Fweets';
import { sortByDateCreated } from '../helpers/date';

const Home = ({ currentUser, loadFollowingUsers, ...props }) => {
  const [displayFweets, setDisplayFweets] = useState([]);

  // Load current user following users;
  useEffect(() => {
    if (currentUser && currentUser.following) {
      loadFollowingUsers(currentUser.following);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update displayFweets on allUsers change with following users
  useEffect(() => {
    if (props.allUsers) {
      updateDisplayFweets(props.allUsers);
      console.log('update display');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.allUsers]);

  useEffect(() => {
    if (currentUser && currentUser.fweets) {
      const fweetsLength = currentUser.fweets.length;

      if (fweetsLength === 0) {
        return;
      }

      setDisplayFweets((prevFweets) => [
        ...prevFweets,
        {
          ...currentUser.fweets[fweetsLength - 1],
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.fweets]);
  return (
    <HomeContainer wt="100%" ht="100%" jc="flex-start" ai="flex-start" column>
      <PageName name="Home" />

      <Container>
        <Fweet />
      </Container>
      <Container className="space-container" />

      {displayFweets ? <Fweets fweets={displayFweets} /> : <div>Loading</div>}
    </HomeContainer>
  );

  function updateDisplayFweets(allUsers) {
    const newDisplayFweets = [];

    try {
      currentUser.following.forEach((userId) => {
        const user = allUsers[userId];
        if (!user) {
          return;
        }

        const userFweets = user.fweets;
        if (!userFweets || userFweets.length === 0) {
          return;
        }

        // Get last 3 fweets and push to display fweets;
        const fweetKeys = Object.keys(userFweets);
        const fweetCount = 3;
        let count = 0;

        for (let i = fweetKeys.length - 1; i >= 0; i--) {
          if (count === fweetCount) {
            break;
          }

          const userFweet = userFweets[fweetKeys[i]];

          const newFweet = fweet(
            user.id,
            user.name,
            user.username,
            user.pictureUrl,
            userFweet.id,
            userFweet.text,
            userFweet.dateCreated,
            userFweet.refweets,
            userFweet.replies,
            userFweet.refweet ? userFweet.refweet : null
          );

          count++;
          newDisplayFweets.push(newFweet);
        }
      });

      console.log(newDisplayFweets);
      setDisplayFweets(sortByDateCreated(newDisplayFweets).reverse());
    } catch (error) {
      console.log(error);
    }
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    allUsers: state.users.all,
  };
};

export default connect(mapStateToProps, { loadFollowingUsers: loadUsers })(
  Home
);
