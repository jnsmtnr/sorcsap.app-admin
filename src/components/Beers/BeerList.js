import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

export default function BeerList(props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Név</TableCell>
                        <TableCell>Típus</TableCell>
                        <TableCell>Alkohol</TableCell>
                        <TableCell>Főzde</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.beers.map((beer) => (
                        <TableRow key={beer._id} hover>
                            <TableCell>{beer.name}</TableCell>
                            <TableCell>{beer.type}</TableCell>
                            <TableCell>{beer.alc} %</TableCell>
                            <TableCell>{beer.brewery}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
