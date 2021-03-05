import PublicRoute from './helpers/PublicRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute authenticated={false} exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
