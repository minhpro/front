import axiosClient from "api/axiosClient";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddSchoolForm from "./AddSchoolForm";
import { makeStyles } from "@mui/styles";

const columns = [
    { id: 'id', label: 'Id', minWidth: 10 },
    {
        id: 'name',
        label: 'Tên trường',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'province',
        label: 'Tỉnh / Thành Phố',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'district',
        label: 'Quận / Huyện',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'area',
        label: 'Xã / Phường',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'description',
        label: 'Thông tin',
        minWidth: 150,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    }
];

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function SchoolManagement() {
    const classes = useStyles();

    const [schools, setSchools] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditButton = (e, row) => {
        e.preventDefault();
        alert("Edit: " + row.id);
    }

    React.useEffect(() => {
        const url = 'schools'
        axiosClient.get(url)
            .then(res => {
                setSchools(res.data)
            })        
    }, [])

    return (
        <div style={{ padding: '80px 30px 0px 50px' }}>
            <Paper className={classes.pageContent}>
                <AddSchoolForm />
            </Paper>
            <h2>Danh sách trường học</h2>
            <br/>
            <Button variant="contained">Thêm mới</Button>
            <br/>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell
                                        key='actions'
                                        align='center'
                                        style={{ minWidth: 20 }}
                                    >
                                        Thao tác
                                    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schools
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key='actions' align='center'>
                                                <Button variant="outlined" color="secondary" onClick={(e) => handleEditButton(e, row)}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={schools.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số dòng trên trang"
                />
            </Paper>
        </div>
    );
}
