import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../redux/actions';

import ProfileCard from './ProfileCard';
import { FlexContainer, Searchbar, SearchbarResult } from './StyledComponents';

function SearchUser(props) {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [hasMouseOverResult, setHasMouseOverResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const doneTypingInterval = 1000; // ms

  useEffect(() => {
    if (!searchText) {
      return;
    }
    const newTimer = setTimeout(doneTyping, doneTypingInterval);

    return function cleanup() {
      clearTimeout(newTimer);
    };
    // eslint-disable-next-line
  }, [searchText]);

  useEffect(() => {
    if (props.searchUsersId && props.allUsers) {
      const newResult = [];
      props.searchUsersId.forEach((id) => {
        const user = props.allUsers[id];

        if (!user) {
          return;
        }

        newResult.push(user);
      });
      setSearchResult(newResult);
      setIsSearching(false);
    }
    // eslint-disable-next-line
  }, [props.searchUsersId]);

  return (
    <FlexContainer className="relative">
      <Searchbar
        value={searchText}
        onChange={handleSearchTextChange}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        placeholder="Search username"
      />

      {(hasFocus || hasMouseOverResult) && searchText !== '' ? (
        <SearchbarResult
          onMouseEnter={(e) => {
            setHasMouseOverResult(true);
          }}
          onMouseLeave={() => {
            setHasMouseOverResult(false);
          }}
          onClick={() => {
            setHasMouseOverResult(false);
          }}
        >
          {isSearching ? (
            <FlexContainer>Searching...</FlexContainer>
          ) : (
            <FlexContainer column>
              {searchResult && searchResult.length > 0 ? (
                searchResult.map((user) => (
                  <ProfileCard key={user.id} user={user} />
                ))
              ) : (
                <div>No users found.</div>
              )}
            </FlexContainer>
          )}
        </SearchbarResult>
      ) : null}
    </FlexContainer>
  );

  function handleSearchTextChange(e) {
    const newText = e.target.value;
    setSearchText(newText);
  }

  function doneTyping() {
    if (isSearching) {
      return;
    }
    props.searchUsers(props.currentUser.username, searchText);
    setIsSearching(true);
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    allUsers: state.users.all,
    searchUsersId: state.users.searchUsersId,
  };
};

export default connect(mapStateToProps, { searchUsers })(SearchUser);
