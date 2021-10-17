import { useEffect, useState } from 'react'
import api from '../api'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('/users')
            .then(response => setUsers(response.data))
            .catch(console.log)
    }, [])

    if (users.length === 0) return <div>Töltés...</div>

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Admin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user._id} hover>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell padding="checkbox" align="center">
                                {user.admin && <CheckCircleOutlineIcon fontSize="small" color="success" />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}