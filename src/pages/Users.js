import React, { useEffect, useState, useCallback } from 'react'
import api from '../api'

import UserList from '../components/Users/UserList'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import BackButton from '../components/BackButton'

export default function Users() {
    const [users, setUsers] = useState([])

    const getUsers = useCallback(() => {
        api.get('/users')
            .then(response => setUsers(response.data))
            .catch(console.log)
    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])


    if (users.length === 0) return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 48px - 1em)', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    )

    return (
        <React.Fragment>
            <BackButton>Felhasználók</BackButton>
            <UserList users={users} onRefresh={getUsers} />
        </React.Fragment>
    )
}
