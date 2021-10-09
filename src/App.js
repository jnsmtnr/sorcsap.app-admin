import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Container from '@mui/material/Container'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

function App() {
    const token = useSelector(state => state.token)

    return (
        <Container maxWidth="md">
            <Router>
                <Switch>
                    {!token && <Route path="/login"><LoginPage /></Route>}
                    {!token && <Redirect to="/login" />}
                    <Route to="/" exact>
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
