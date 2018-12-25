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

let abortController = new AbortController();
let signal = abortController.signal


history.listen((...args) => {
    // cancel the request (the message parameter is optional)
    abortController.abort();
    abortController = new AbortController();
    signal = abortController.signal
})

class Invoices extends React.Component<RouteComponentProps> {
    componentDidMount() {

        fetch('https://jsonplaceholder.typicode.com/posts', { signal }).then(function (response) {
            console.log(response)
        }).catch(function (e) {
            console.log(e)
        })

        fetch('https://jsonplaceholder.typicode.com/posts', { signal }).then(function (response) {
            console.log(response)
        }).catch(function (e) {
            console.log(e)
        })

        fetch('https://jsonplaceholder.typicode.com/posts', { signal }).then(function (response) {
            console.log(response)
        }).catch(function (e) {
            console.log(e)
        })
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