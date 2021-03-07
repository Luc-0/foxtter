import PublicRoute from './helpers/PublicRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Navbar from './components/Navbar';

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
        {/* Authenticated */}
        {true ? <Navbar /> : null}
      </Switch>
    </Router>
  );
}

export default App;
