import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Link to="/users">Felhasználók</Link>
        </Box>
    )
}
