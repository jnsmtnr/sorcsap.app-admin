import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Beers from './pages/Beers'

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
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="beers" element={<Beers />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Container>
        </Box>
    );
}

export default App;
