import * as React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button } from '@mui/material';
// import {  useNavigate } from "react-router-dom";

// const navigate = useNavigate();


// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }
function userData(id, firstName, lastName, email, role, username) {
    return { id, firstName, lastName, email, role, username };
}

// const rows = [
//   createData(
//     // 0,
//     // '16 Mar, 2019',
//     // 'Elvis Presley',
//     // 'Tupelo, MS',
//     // 'VISA ⠀•••• 3719',
//     // 312.44,
//   ),
//   createData(
//     // 1,
//     // '16 Mar, 2019',
//     // 'Paul McCartney',
//     // 'London, UK',
//     // 'VISA ⠀•••• 2574',
//     // 866.99,
//   ),
//   createData(
//     // 2, 
//     // '16 Mar, 2019', 
//     // 'Tom Scholz', 
//     // 'Boston, MA', 
//     // 'MC ⠀•••• 1253', 
//     // 100.81
//     ),
//   createData(
//     // 3,
//     // '16 Mar, 2019',
//     // 'Michael Jackson',
//     // 'Gary, IN',
//     // 'AMEX ⠀•••• 2000',
//     // 654.39,
//   ),
//   createData(
//     // 4,
//     // '15 Mar, 2019',
//     // 'Bruce Springsteen',
//     // 'Long Branch, NJ',
//     // 'VISA ⠀•••• 5919',
//     // 212.79,
//   ),
// ];

const users = [
    userData(
        0,
        'flu',
        'weak',
        'flu shot',
        'null',
        'malaysia',
    ),
    userData(
        1,
        'flu',
        'weak',
        'flu shot',
        'null',
        'malaysia',
    ),
    userData(
        2,
        'flu',
        'weak',
        'flu shot',
        'null',
        'malaysia',
    ),
    userData(
        3,
        'flu',
        'weak',
        'flu shot',
        'null',
        'malaysia',
    ),
    // userData(
    //     // 4,
    //     // '15 Mar, 2019',
    //     // 'Bruce Springsteen',
    //     // 'Long Branch, NJ',
    //     // 'VISA ⠀•••• 5919',
    //     // 212.79,
    // ),
];

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function UserList() {
    return (
        <React.Fragment>
            <Title>user list</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>firstName</TableCell>
                        <TableCell>lastName</TableCell>
                        <TableCell>role</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>userName</TableCell>
                        {/* <TableCell align="right">infection record</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>   
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            {/* <TableCell align="right">{row.infectionRecord}</TableCell> */}
                            <Button  color="primery">Edit</Button>
                            <Button variant="outlined" color="error">
                                Delete
                            </Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
        </React.Fragment>
    );
}