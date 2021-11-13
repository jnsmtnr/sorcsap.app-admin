import { Link as RouterLink } from 'react-router-dom'

import Link from '@mui/material/Link'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export default function BackButton(props) {
    return (
        <Link
            display="flex"
            alignItems="center"
            underline="none"
            to="/"
            component={RouterLink}
            color="inherit"
            fontWeight="500"
        >
            <ArrowBackIosNewIcon fontSize="inherit" sx={{ marginRight: '0.5em' }} />
            { props.children }
        </Link>
    )
}