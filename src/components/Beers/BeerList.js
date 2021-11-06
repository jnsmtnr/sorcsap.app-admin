import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import BeerMenu from './BeerMenu'

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
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.beers.map((beer) => (
                        <TableRow key={beer._id} hover>
                            <TableCell>{beer.name}</TableCell>
                            <TableCell>{beer.type}</TableCell>
                            <TableCell>{beer.alc} %</TableCell>
                            <TableCell>{beer.brewery}</TableCell>
                            <TableCell padding="checkbox">
                                <BeerMenu id={beer._id} onRefresh={props.onRefresh} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
