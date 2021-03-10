import PublicRoute from './helpers/PublicRoute';
import PrivateRoute from './helpers/PrivateRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Container, FlexContainer } from './components/StyledComponents';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute authenticated={false} exact path="/" component={Landing} />
        <PublicRoute
          authenticated={false}
          exact
          path="/login"
          component={Login}
        />
      </Switch>

      <FlexContainer jc="flex-start" ai="flex-start">
        {/* Authenticated */}
        {true ? <Navbar /> : null}
        <main>
          <FlexContainer>
            <Switch>
              <PrivateRoute
                authenticated={true}
                exact
                path="/home"
                component={Home}
              />
              <PrivateRoute
                authenticated={true}
                exact
                path="/notifications"
                component={() => <div>Notifications</div>}
              />
              <PrivateRoute
                authenticated={true}
                exact
                path="/messages"
                component={() => <div>Messages</div>}
              />
              <PrivateRoute
                authenticated={true}
                exact
                path="/connect_people"
                component={() => <div>Connect people</div>}
              />
              <PrivateRoute
                authenticated={true}
                exact
                path="/:id"
                component={Profile}
              />
            </Switch>
            <Container bgc="rgb(235, 238, 240)" wt="100%">
              Hold...
            </Container>
          </FlexContainer>
        </main>
      </FlexContainer>
    </Router>
  );
}

export default App;
