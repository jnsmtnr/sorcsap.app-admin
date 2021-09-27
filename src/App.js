import { useSelector } from 'react-redux'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Login from './components/Login'

function App() {
  const token = useSelector(state => state.token)

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {!token && <Login />}
        {token && <div>Bejelentkezve</div>}
      </Box>
    </Container>
  );
}

export default App;
