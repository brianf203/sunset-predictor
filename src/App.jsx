import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Prediction from './Prediction';

const App = () => {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/prediction" component={Prediction} />
        </Switch>
      </Router>
    );
  };

export default App;