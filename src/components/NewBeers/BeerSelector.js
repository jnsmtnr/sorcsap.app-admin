import { useCallback, useState, useEffect } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack'

import api from '../../api'

export default function BeerSelector(props) {
    const [beers, setBeers] = useState([])
    const [brewery, setBrewery] = useState('')
    const [beerId, setBeerId] = useState('')

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

    const breweries = beers
        .reduce((breweries, beer) => {
            if (!breweries.includes(beer.brewery)) {
                breweries.push(beer.brewery)
            }
            
            return breweries
        }, [])
        .sort()

    const sortedBeers = beers
        .filter(beer => brewery ? beer.brewery === brewery : true)
        .sort((a, b) => a.name > b.name ? 1 : -1)

    function onBreweryChange(event) {
        setBeerId('')
        setBrewery(event.target.value)
    }

    function saveBeer() {
        props.onSave(beerId)
    }

    return (
        <Dialog open onClose={props.onClose}>
            <DialogTitle>Meglévő sörhöz hozzáadás</DialogTitle>
            <DialogContent>
                <Stack>
                    <TextField
                        label="Főzde"
                        margin="dense"
                        select
                        value={brewery}
                        onChange={onBreweryChange}
                    >
                        {breweries.map((brewery) => (<MenuItem key={brewery} value={brewery}>{brewery}</MenuItem>))}
                    </TextField>
                    <TextField
                        label="Sör"
                        margin="dense"
                        select
                        value={sortedBeers.some((beer) => beer._id === beerId) ? beerId : ''}
                        onChange={(event) => setBeerId(event.target.value)}
                    >
                        {sortedBeers.map((beer) => (<MenuItem key={beer._id} value={beer._id}>{beer.name}</MenuItem>))}
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Mégsem</Button>
                <LoadingButton loading={props.loading} variant="contained" onClick={saveBeer}>Mentés</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
