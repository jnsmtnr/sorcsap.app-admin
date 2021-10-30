import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import UserMenu from './UserMenu'

export default function UserList(props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.map(user => (
                        <TableRow key={user._id} hover>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell padding="checkbox" align="center">
                                {user.admin && <CheckCircleOutlineIcon fontSize="small" color="success" />}
                            </TableCell>
                            <TableCell padding="checkbox">
                                <UserMenu id={user._id} isAdmin={user.admin} onRefresh={props.onRefresh} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
