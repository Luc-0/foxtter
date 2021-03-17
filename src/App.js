import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { loadUser } from './redux/actions';

import PublicRoute from './helpers/PublicRoute';
import PrivateRoute from './helpers/PrivateRoute';
import { getUserId } from './helpers/auth';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Container, FlexContainer } from './components/StyledComponents';
import ProfileCard from './components/ProfileCard';
import Connect from './pages/Connect';

function App(props) {
  useEffect(() => {
    const userId = getUserId();
    console.log(userId);
    if (userId) {
      props.loadUser(userId);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute
          authenticated={props.authenticated}
          exact
          path="/"
          component={Landing}
        />
        <PublicRoute
          authenticated={props.authenticated}
          exact
          path="/login"
          component={Login}
        />

        <FlexContainer jc="flex-start" ai="flex-start">
          {/* Authenticated */}
          {props.authenticated ? <Navbar /> : null}
          <main>
            <FlexContainer>
              <Switch>
                <PrivateRoute
                  authenticated={props.authenticated}
                  exact
                  path="/home"
                  component={Home}
                />
                <PrivateRoute
                  authenticated={props.authenticated}
                  exact
                  path="/notifications"
                  component={() => <div>Notifications</div>}
                />
                <PrivateRoute
                  authenticated={props.authenticated}
                  exact
                  path="/messages"
                  component={() => <div>Messages</div>}
                />
                <PrivateRoute
                  authenticated={props.authenticated}
                  exact
                  path="/connect_people"
                  component={Connect}
                />
                <PrivateRoute
                  authenticated={props.authenticated}
                  exact
                  path="/:id"
                  component={Profile}
                />
              </Switch>
              <Container bgc="rgb(235, 238, 240)" wt="100%">
                <ProfileCard />
                <ProfileCard />
              </Container>
            </FlexContainer>
          </main>
        </FlexContainer>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { loadUser })(App);
