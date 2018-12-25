import * as React from "react";
import axios from "axios";
import {
  Router,
  Link,
  createMemorySource,
  createHistory,
  LocationProvider,
  RouteComponentProps
} from "@reach/router";
// listen to the browser history
let history = createHistory(window as any);

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

let abortController = new AbortController();
let signal = abortController.signal;

history.listen((...args) => {
  // cancel the request (the message parameter is optional)
  abortController.abort();
  abortController = new AbortController();
  signal = abortController.signal;
});

class Invoices extends React.Component<RouteComponentProps> {
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts", { signal })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(e) {
        console.log(e);
      });

    fetch("https://jsonplaceholder.typicode.com/posts", { signal })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(e) {
        console.log(e);
      });

    fetch("https://jsonplaceholder.typicode.com/posts", { signal })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(e) {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <h1>Invoices</h1>
      </div>
    );
  }
}

class Dash extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div>
        <h1>Dash</h1>
      </div>
    );
  }
}

const Main: any = ({
  children,
  ...rest
}: {
  children: React.ReactChildren;
}) => {
  console.log(rest);
  return (
    <div>
      <h1>Welcome to the App!</h1>
      <ul>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="invoices">Invoices</Link>
        </li>
      </ul>
      <hr />
      {children}
    </div>
  );
};

class App extends React.Component {
  state = {
    data: 123
  };
  componentDidMount() {
    setInterval(() => {
      const newState = this.state.data + 1;
      this.setState({
        data: newState
      });
    }, 3000);
  }
  render() {
    return (
      <LocationProvider history={history}>
        <Router>
          <Main state={this.state} path="/">
            <Invoices path="invoices" />
            <Dash path="dashboard" />
          </Main>
        </Router>
      </LocationProvider>
    );
  }
}

export default App;
