import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Store from './store';
import Header from './components/Header';
// import Community from './routes/Community/Community';
import Categories from './routes/Categories';
import ExamQuestion from './routes/Categories/ExamQuestion';
import Main from './routes/Categories/Main'
// import Checklist from './routes/Checklist';
// import Learn from './routes/Learn/Learn';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Header />
            <div className="main">
              <Switch>
                {/* <Route path="/checklist" component={Checklist} exact /> */}
                <Route path="/:category/evaluation" component={ExamQuestion}/>
                <Route path="/:category" component={Main}/>
                <Route component={Categories} />
              </Switch>
            </div>
          </div>
        </ Router>
      </Provider>
    );
  }
}

export default App;
