import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Router } from "react-router";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { prepareStore } from "./redux/createStoreWithMiddleware";
import createRoutesWithStore from "./routes";
import { Provider } from "react-redux";
const store = prepareStore();
const routes = createRoutesWithStore();
const history = syncHistoryWithStore(browserHistory, store);


class Root extends React.Component {
    render() {
      return (
        <div>
          <Provider store={store}>
            <Router history={history}>{routes}</Router>
          </Provider>
        </div>
      );
    }
  }
  
export {Root};

ReactDOM.render(<Root />, document.getElementById('root') || document.createElement('div') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
