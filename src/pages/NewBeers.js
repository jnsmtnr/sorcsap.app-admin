import React, { useState, useEffect } from "react"

import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress"

import BackButton from '../components/BackButton.js'
import NewBeerList from '../components/NewBeers/NewBeerList.js'

import api from '../api'

export default function NewBeers() {
    const [loading, setLoading] = useState(false)
    const [newBeers, setNewBeers] = useState([])

    useEffect(() => {
        setLoading(true)

        api.get('/ratings/new-beers')
            .then((response) => setNewBeers(response.data))
            .catch(console.log)
            .finally(() => setLoading(false))
    }, [])

    return (
        <React.Fragment>
            <BackButton>Új Sörök</BackButton>
            {!loading && newBeers.length > 0 && <NewBeerList beers={newBeers} />}
            {newBeers.length === 0 && (
                <Box textAlign="center">
                    {loading ? <CircularProgress /> : 'Nincs új sör'}
                </Box>
            )}
        </React.Fragment>
    )
}
