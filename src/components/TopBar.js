import { useDispatch, useSelector } from 'react-redux'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function TopBar() {
    const dispatch = useDispatch()
    const email = useSelector(state => state.email)

    function logout() {
        dispatch({
            type: 'reset-user'
        })
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'end' }} variant="dense" disableGutters>
                <Typography mr={1} variant="button">{email}</Typography>
                <Divider
                    flexItem
                    variant="middle"
                    orientation="vertical"
                    sx={{ borderColor: 'inherit' }}
                />
                <Button 
                    onClick={logout} 
                    color="inherit"
                >
                    Kijelentkezés
                </Button>
            </Toolbar>
        </AppBar>
    )
}