import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TopBar from './components/TopBar'

function App() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('login-data'))
        if (loginData) {
            dispatch({
                type: 'set-user',
                payload: loginData
            })
        }
    }, [dispatch])

    if (!token) return <LoginPage />

    return (
        <Box>
            <TopBar />
            <Container maxWidth="md">
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Container>
        </Box>
    );
}

export default App;
