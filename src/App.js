import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Container from '@mui/material/Container'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'

function App() {
    const token = useSelector(state => state.token)

    return (
        <Container maxWidth="md">
            <Router>
                <Switch>
                    {!token && <Route path="/login"><LoginPage /></Route>}
                    {!token && <Redirect to="/login" />}
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
