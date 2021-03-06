import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions';

import {
  Container,
  NavbarContainer,
  Icon,
  NavButton,
  NavText,
  FlexContainer,
  LightText,
  NavbarHeader,
} from '../components/StyledComponents';
import { Link } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';

const Navbar = (props) => {
  const [prevSelected, setPrevSelected] = useState();
  const dataNavButtonId = 'navbutton';

  return (
    <NavbarHeader>
      <NavbarContainer column ai="flex-start" jc="flex-start" pd="10px 20px">
        <Link to="/home">
          <Icon imgUrl="/images/foxtter-icon.png" />
        </Link>
        <NavButton
          data-btnid={dataNavButtonId}
          onClick={handleSelect}
          size="1.3em"
          as={Link}
          to="/home"
        >
          <Icon wt="24px" ht="24px" imgUrl="/images/home-icon.png" />
          <NavText>Home</NavText>
        </NavButton>
        <NavButton
          data-btnid={dataNavButtonId}
          onClick={handleSelect}
          as={Link}
          to="/notifications"
        >
          <Icon wt="24px" ht="24px" imgUrl="/images/notifications-icon.png" />
          <NavText>Notifications</NavText>
        </NavButton>
        <NavButton
          data-btnid={dataNavButtonId}
          onClick={handleSelect}
          as={Link}
          to="/messages"
        >
          <Icon wt="24px" ht="24px" imgUrl="/images/messages-icon.png" />
          <NavText>Messages</NavText>
        </NavButton>
        <NavButton
          data-btnid={dataNavButtonId}
          onClick={handleSelect}
          as={Link}
          to="/connect_people"
        >
          <Icon wt="24px" ht="24px" imgUrl="/images/connect-icon.png" />
          <NavText>Connect</NavText>
        </NavButton>
        <NavButton
          data-btnid={dataNavButtonId}
          onClick={handleSelect}
          as={Link}
          to={{
            pathname: `/${props.user.username}`,
            state: {
              profileUserId: props.user.id,
            },
          }}
        >
          <Icon wt="24px" ht="24px" imgUrl="/images/profile-icon.png" />
          <NavText>Profile</NavText>
        </NavButton>

        <FlexContainer
          jc="flex-start"
          ai="center"
          wt="100%"
          ht="50px"
          mg="auto 0 0"
        >
          <ProfilePicture imgUrl={props.user.pictureUrl} />
          <Container wt="auto" ht="100%">
            <NavText mg="10px 15px 0">{props.user.name}</NavText>
            <LightText mg="5px 15px 0">@{props.user.username}</LightText>
          </Container>
          <NavButton onClick={props.signOut} mg="0 0 0 auto">
            <Icon wt="24px" ht="24px" imgUrl="/images/logout-icon.png" />
          </NavButton>
        </FlexContainer>
      </NavbarContainer>
    </NavbarHeader>
  );

  function handleSelect(e) {
    const target = e.target;

    if (!target.dataset || !target.dataset.btnid === dataNavButtonId) {
      return;
    }

    if (target.classList.contains('selected')) {
      return;
    }

    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }

    target.classList.add('selected');
    setPrevSelected(target);
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { signOut })(Navbar);
