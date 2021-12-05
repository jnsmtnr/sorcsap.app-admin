import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import CheckBox from '@mui/material/Checkbox'

export default function BeerList(props) {
    function handleChange(event) {
        props.onSelect(event.target.value)
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Név</TableCell>
                        <TableCell>Típus</TableCell>
                        <TableCell>Alkohol</TableCell>
                        <TableCell>Főzde</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.beers.map((beer) => (
                        <TableRow key={beer._id} hover>
                            <TableCell padding="checkbox">
                                <CheckBox
                                    checked={props.selected.includes(beer._id)}
                                    value={beer._id}
                                    onChange={handleChange}
                                />
                            </TableCell>
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
