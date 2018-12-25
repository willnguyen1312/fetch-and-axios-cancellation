import * as React from "react"
import axios from 'axios'
import {
    Router, Link,
    createMemorySource,
    createHistory,
    LocationProvider,
    RouteComponentProps
} from "@reach/router"
// listen to the browser history
let history = createHistory(window as any)

const CancelToken = axios.CancelToken;
let source = CancelToken.source();


history.listen((...args) => {
    // cancel the request (the message parameter is optional)
    source.cancel('Operation canceled by the user.');
    source= CancelToken.source();
})

class Invoices extends React.Component<RouteComponentProps> {
    componentDidMount() {

        axios.get('https://jsonplaceholder.typicode.com/posts', {
            cancelToken: source.token
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                // handle error
            }
        }).then(console.log)

        axios.get('https://jsonplaceholder.typicode.com/posts', {
            cancelToken: source.token
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                // handle error
            }
        }).then(console.log)

        axios.get('https://jsonplaceholder.typicode.com/posts', {
            cancelToken: source.token
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                // handle error
            }
        }).then(console.log)
    }
    render() {
        return <div>
            <h1>Invoices</h1>
        </div>
    }
}

class Dash extends React.Component<RouteComponentProps> {
    render() {
        return <div>
            <h1>Dash</h1>
        </div>
    }
}

const Main: any = ({ children }: { children: React.ReactChildren }) => (
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
)

const App = () => (
    <LocationProvider history={history}>
        <Router>
            <Main path="/">
                <Invoices path="invoices" />
                <Dash path="dashboard" />
            </Main>
        </Router>
    </LocationProvider>
)

export default App;