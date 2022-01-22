import React, { useState, useEffect, useCallback } from "react"

import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress"
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import BackButton from '../components/BackButton.js'
import NewBeerList from '../components/NewBeers/NewBeerList.js'
import BeerEditor from '../components/Beers/BeerEditor.js'
import BeerSelector from "../components/NewBeers/BeerSelector.js"

import api from '../api'

export default function NewBeers() {
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [newBeers, setNewBeers] = useState([])
    const [selectedBeerIds, setSelectedBeerIds] = useState([])
    const [newBeerOpen, setNewBeerOpen] = useState(false)
    const [existingBeerOpen, setExistingBeerOpen] = useState(false)

    const getNewBeers = useCallback(() => {
        setLoading(true)

        api.get('/ratings/new-beers')
            .then((response) => setNewBeers(response.data))
            .catch(console.log)
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        getNewBeers()
    }, [getNewBeers])

    function onSelectHandler(selectedId) {
        setSelectedBeerIds(ids => {
            if (ids.includes(selectedId)) return ids.filter(id => id !== selectedId)

            return ids.concat(selectedId)
        })
    }

    function onNewBeerSaveHandler(name, brewery, type, alc) {
        setSaveLoading(true)

        api.post('/ratings/new-beers/save-new-beer', { name, brewery, type, alc: +alc, ratingIds: selectedBeerIds })
            .then(() => {
                getNewBeers()
                setNewBeerOpen(false)
            })
            .catch(console.log)
            .finally(() => setSaveLoading(false))
    }

    function onExistingBeerSaveHandler(beerId) {
        setSaveLoading(true)

        api.post('/ratings/new-beers/save-existing-beer', { beerId, ratingIds: selectedBeerIds })
            .then(() => {
                getNewBeers()
                setExistingBeerOpen(false)
            })
            .catch(console.log)
            .finally(() => setSaveLoading(false))
    }

    return (
        <React.Fragment>
            <BackButton>Új Sörök</BackButton>
            <Stack spacing={2} direction="row" justifyContent="center">
                <Button
                    variant="outlined"
                    disabled={selectedBeerIds.length === 0}
                    onClick={() => setNewBeerOpen(true)}
                    
                >
                    Új sör hozzáadása
                </Button>
                <Button
                    variant="outlined"
                    disabled={selectedBeerIds.length === 0}
                    onClick={() => setExistingBeerOpen(true)}
                >
                    Meglévő sörhöz hozzáadás
                </Button>
            </Stack>
            {!loading && newBeers.length > 0 && <NewBeerList beers={newBeers} selected={selectedBeerIds} onSelect={onSelectHandler} />}
            {newBeers.length === 0 && (
                <Box textAlign="center" mt={2}>
                    {loading ? <CircularProgress /> : 'Nincs új sör'}
                </Box>
            )}
            {newBeerOpen && (
                <BeerEditor
                    open={newBeerOpen}
                    loading={saveLoading}
                    selected={newBeers.find(beer => beer._id === selectedBeerIds[0])}
                    onClose={() => setNewBeerOpen(false)}
                    onSave={onNewBeerSaveHandler}
                />
            )}
            {existingBeerOpen && (
                <BeerSelector
                    loading={saveLoading}
                    onClose={() => setExistingBeerOpen(false)}
                    onSave={onExistingBeerSaveHandler}
                />
            )}
        </React.Fragment>
    )
}
