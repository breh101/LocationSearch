import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function BasicTable({places}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Latitude</TableCell>
                        <TableCell align="right">Longitude</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {places.map((place) => (
                        <TableRow
                            key={place.key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">
                                {place.address}
                            </TableCell>
                            <TableCell align="right">{place.name}</TableCell>
                            <TableCell align="right">{place.location.lat}</TableCell>
                            <TableCell align="right">{place.location.lng}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}