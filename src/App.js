import PublicRoute from './helpers/PublicRoute';
import PrivateRoute from './helpers/PrivateRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Container, FlexContainer } from './components/StyledComponents';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute authenticated={true} exact path="/" component={Landing} />
        <PublicRoute
          authenticated={true}
          exact
          path="/login"
          component={Login}
        />
        <FlexContainer jc="flex-start" ai="flex-start">
          {/* Authenticated */}
          {true ? <Navbar /> : null}
          <main>
            <FlexContainer>
              <PrivateRoute
                authenticated={true}
                exact
                path="/home"
                component={Home}
              />
              <Container bgc="rgb(235, 238, 240)" wt="100%">
                Hold...
              </Container>
            </FlexContainer>
          </main>
        </FlexContainer>
      </Switch>
    </Router>
  );
}

export default App;
