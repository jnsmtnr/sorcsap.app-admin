import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange } from '@mui/material/colors';

export default function Provider({children}) {
    const theme = createTheme({
        palette: {
          primary: {
            main: orange[500],
          },
        },
    })

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
