import React, { useState } from 'react'

import api from '../../api'

import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
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

    function deleteBeer() {
        api.delete('/beers/' + props.id).then(props.onRefresh)

        closeMenu()
    }

    function editBeer() {
        props.onEdit(props.id)

        closeMenu()
    }

    return (
        <React.Fragment>
            <IconButton onClick={openMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu open={open} anchorEl={anchor} onClose={closeMenu}>
                <MenuItem onClick={editBeer}>
                    Szerkesztés
                </MenuItem>
                <MenuItem onClick={deleteBeer}>
                    Törlés
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
