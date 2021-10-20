import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import api from '../api/index'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CartActions from '@mui/material/CardActions'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const email = useRef()
  const password = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await api.post('/users/login', {
        email: email.current.value,
        password: password.current.value
      })

      setLoading(false)

      if (!response.data.admin) {
        setError('A felhasználó nem admin')
        return
      }

      dispatch({
        type: 'set-user',
        payload: {
          token: response.data.token,
          email: email.current.value
        }
      })

      history.replace('/')
    } catch (err) {
      setLoading(false)

      if (err.response?.status === 401) {
        setError('Rossz e-mail vagy jelszó')
        return
      }

      setError('Váratlan hiba')
    }
  }

  return (
    <Card>
      <CardHeader title="Bejelentkezés az admin felületbe" sx={{ '& .MuiCardHeader-title': { textAlign: 'center' } }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Stack spacing={4}>
            <TextField label="E-mail" fullWidth autoFocus inputRef={email} error={!!error} />
            <TextField label="Jelszó" fullWidth type="password" inputRef={password} error={!!error} helperText={error} />
          </Stack>
        </CardContent>
        <CartActions sx={{ justifyContent: "center" }}>
          <LoadingButton loading={loading} type="submit">Bejelentkezés</LoadingButton>
        </CartActions>
      </form>
    </Card>
  )
}

export default Login
