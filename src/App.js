import { useState } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Login from './components/Login'

function App() {
  const [token, setToken] = useState(null)

  function handleLogin(token) {
    setToken(token)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {!token && <Login onLogin={handleLogin} />}
        {token && <div>Bejelentkezve</div>}
      </Box>
    </Container>
  );
}

export default App;
