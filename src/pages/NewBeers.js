import React, { useState, useEffect, useCallback } from "react"

import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress"
import Button from '@mui/material/Button'

import BackButton from '../components/BackButton.js'
import NewBeerList from '../components/NewBeers/NewBeerList.js'
import BeerEditor from '../components/Beers/BeerEditor.js'

import api from '../api'

export default function NewBeers() {
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [newBeers, setNewBeers] = useState([])
    const [selectedBeerIds, setSelectedBeerIds] = useState([])
    const [open, setOpen] = useState(false)

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

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function onSaveHandler(name, brewery, type, alc) {
        setSaveLoading(true)

        api.post('/ratings/new-beers//save-new-beer', { name, brewery, type, alc: +alc, ratingIds: selectedBeerIds })
            .then(() => {
                getNewBeers()
                closeModal()
            })
            .catch(console.log)
            .finally(() => setSaveLoading(false))
    }

    return (
        <React.Fragment>
            <BackButton>Új Sörök</BackButton>
            <Box textAlign="center">
                <Button
                    variant="outlined"
                    disabled={selectedBeerIds.length === 0}
                    onClick={openModal}
                >
                    Új sör hozzáadása
                </Button>
            </Box>
            {!loading && newBeers.length > 0 && <NewBeerList beers={newBeers} selected={selectedBeerIds} onSelect={onSelectHandler} />}
            {newBeers.length === 0 && (
                <Box textAlign="center" mt={2}>
                    {loading ? <CircularProgress /> : 'Nincs új sör'}
                </Box>
            )}
            {open && (
                <BeerEditor
                    open={open}
                    loading={saveLoading}
                    selected={newBeers.find(beer => beer._id === selectedBeerIds[0])}
                    onClose={closeModal}
                    onSave={onSaveHandler}
                />
            )}
        </React.Fragment>
    )
}
