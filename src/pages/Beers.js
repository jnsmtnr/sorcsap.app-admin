import React, { useEffect, useState, useCallback } from 'react'
import api from '../api'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import BeerList from '../components/Beers/BeerList'
import BeerEditor from '../components/Beers/BeerEditor'

export default function Beers() {
    const [beers, setBeers] = useState([])
    const [open, setOpen] = useState(false)

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    const getBeers = useCallback(() => {
        api.get('/beers')
            .then(response => {
                setBeers(response.data)
            })
            .catch(console.log)
    }, [])

    useEffect(() => {
        getBeers()
    }, [getBeers])

    if (beers.length === 0) return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 48px)', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    )

    return (
        <React.Fragment>
            <Box sx={{ textAlign: "center", marginTop: '1em' }}>
                <Button onClick={openModal} variant="outlined">Új sör hozzáadása</Button>
            </Box>
            <BeerList beers={beers} onRefresh={getBeers} />
            {open && <BeerEditor open={open} onClose={closeModal} onSave={getBeers} />}
        </React.Fragment>
    )
}
