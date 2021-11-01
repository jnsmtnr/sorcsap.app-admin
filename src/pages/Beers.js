import { useEffect, useState } from 'react'
import api from '../api'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import BeerList from '../components/Beers/BeerList'

export default function Beers() {
    const [beers, setBeers] = useState([])

    useEffect(() => {
        api.get('/beers')
            .then(response => {
                setBeers(response.data)
            })
            .catch(console.log)
    }, [])

    if (beers.length === 0) return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 48px)', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    )

    return <BeerList beers={beers} />
}
