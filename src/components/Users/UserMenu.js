import React, { useState } from 'react'

import api from '../../api'

import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function UserMenu(props) {
    const [anchor, setAnchor] = useState(false)
    const open = Boolean(anchor)

    function openMenu(event) {
        setAnchor(event.currentTarget)
    }

    function closeMenu() {
        setAnchor(null)
    }

    function toggleAdmin() {
        api.patch('/users/' + props.id, { admin: !props.isAdmin }).then(props.onRefresh)

        closeMenu()
    }

    function deleteUser() {
        api.delete('/users/' + props.id).then(props.onRefresh)

        closeMenu()
    }

    return (
        <React.Fragment>
            <IconButton onClick={openMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu open={open} anchorEl={anchor} onClose={closeMenu}>
                <MenuItem onClick={toggleAdmin}>
                    {props.isAdmin ? 'Ne legyen admin' : 'Legyen admin'}
                </MenuItem>
                <MenuItem onClick={deleteUser}>
                    Törlés
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
