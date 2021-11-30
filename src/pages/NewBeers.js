import React, { useState, useEffect } from "react"

import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress"

import BackButton from '../components/BackButton.js'
import NewBeerList from '../components/NewBeers/NewBeerList.js'

import api from '../api'

export default function NewBeers() {
    const [newBeers, setNewBeers] = useState([])

    useEffect(() => {
        api.get('/ratings/new-beers')
            .then((response) => setNewBeers(response.data))
            .catch(console.log)
    }, [])

    if (newBeers.length === 0) return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 48px - 1em)', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    )

    return (
        <React.Fragment>
            <BackButton>Új Sörök</BackButton>
            <NewBeerList beers={newBeers} />
        </React.Fragment>
    )
}
