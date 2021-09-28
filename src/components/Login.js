import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CartActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

function Login() {
  const dispatch = useDispatch()

  const email = useRef()
  const password = useRef()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')

    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/users/login', {
        method: 'POST',
        body: JSON.stringify({ 
          email: email.current.value, 
          password: password.current.value 
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      
      if (!response.ok) {
        setError('Rossz e-mail vagy jelszó')
        return 
      }
      const data = await response.json()
      
      if (!data.admin) {
        setError('A felhasználó nem admin')
        return
      }

      dispatch({
        type: 'set-user',
        payload: {
          token: data.token,
          email: email.current.value
        }
      })
    } catch(err) {
      console.log(err)
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
          <Button type="submit">Bejelentkezés</Button>
        </CartActions>
      </form>
    </Card>
  )
}

export default Login
