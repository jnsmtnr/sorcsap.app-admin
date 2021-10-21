import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Container from '@mui/material/Container'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'

function App() {
    const dispatch = useDispatch()
    const history = useHistory()
    const token = useSelector(state => state.token)

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('login-data'))
        if (loginData) {
          dispatch({
            type: 'set-user',
            payload: loginData
          })
    
          history.replace('/')
        }
      }, [dispatch, history])
    
    return (
        <Container maxWidth="md">
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
        </Container>
    );
}

export default App;
