import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Login from './components/Login'

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Login />
      </Box>
    </Container>
  );
}

export default App;
