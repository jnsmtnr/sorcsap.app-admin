import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CartActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function Login(props) {

    return (
        <Card>
            <CardHeader title="Bejelentkezés az admin felületbe" sx={{ '& .MuiCardHeader-title': { textAlign: 'center' } }}/>
            <CardContent>
                <form>
                    <TextField label="E-mail" fullWidth type="email" autoFocus margin="normal" />
                    <TextField label="Jelszó" fullWidth type="password" margin="normal" />
                </form>
            </CardContent>
            <CartActions sx={{ justifyContent: "center" }}>
                <Button>Bejelentkezés</Button>
            </CartActions>
        </Card>
    )
}

export default Login
