import { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'

export default function BeerEditor(props) {
    const [name, setName] = useState(props.selected?.name || '')
    const [brewery, setBrewery] = useState(props.selected?.brewery || '')
    const [alc, setAlc] = useState(props.selected?.alc || '')
    const [type, setType] = useState(props.selected?.type || '')

    const [error, setError] = useState({})

    function saveBeer() {
        setError({})

        let hasError = false

        if (!name) {
            setError(err => ({...err, name: true}))
            hasError = true
        }

        if (!brewery) {
            setError(err => ({...err, brewery: true}))
            hasError = true
        }

        if (!alc) {
            setError(err => ({...err, alc: true}))
            hasError = true
        }

        if (!type) {
            setError(err => ({...err, type: true}))
            hasError = true
        }

        if (hasError) return

        props.onSave(name, brewery, type, alc)
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Új sör hozzáadása</DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    label="Sör neve"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={error.name}
                    helperText={error.name && 'Kötelező kitölteni'}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    label="Főzde"
                    value={brewery}
                    onChange={(e) => setBrewery(e.target.value)}
                    error={error.brewery}
                    helperText={error.brewery && 'Kötelező kitölteni'}
                />
                <Stack direction="row" spacing={1} mt={1}>
                    <TextField
                        variant="outlined"
                        required
                        label="Típusa"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        error={error.type}
                        helperText={error.type && 'Kötelező kitölteni'}
                    />
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        label="Alkohol fok"
                        value={alc}
                        onChange={(e) => setAlc(e.target.value)}
                        error={error.alc}
                        helperText={error.alc && 'Kötelező kitölteni'}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Mégsem</Button>
                <LoadingButton loading={props.loading} variant="contained" onClick={saveBeer}>Mentés</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}