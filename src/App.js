import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage.js'
import Dashboard from './pages/Dashboard.js'
import Users from './pages/Users.js'
import Beers from './pages/Beers.js'
import NewBeers from './pages/NewBeers.js'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TopBar from './components/TopBar'

import { setUser } from './store/user'

function App() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('login-data'))
        
        if (loginData && loginData.expiresAt > new Date().getTime()) {
            dispatch(setUser(loginData))
        }
    }, [dispatch])

    if (!token) return <LoginPage />

    return (
        <Box>
            <TopBar />
            <Container maxWidth="md" sx={{ paddingTop: '1em' }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="beers" element={<Beers />} />
                    <Route path="new-beers" element={<NewBeers />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Container>
        </Box>
    )
}

export default App
