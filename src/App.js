import PublicRoute from './helpers/PublicRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';

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
    </Router>
  );
}

export default App;
