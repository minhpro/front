import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from "@mui/styles";
import { getSchoolList, deleteSchool } from 'api/schoolApi';
import { useNavigate } from "react-router-dom";
import ConfirmDialog from 'components/Dialog/ConfirmDialog';

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
    const navigate = useNavigate();

    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const reloadSchoolList = () => {
        getSchoolList()
            .then(res => {
                setSchools(res.data)
            }) 
    }

    const editSchool = (id) => {
        navigate('/schools/edit-school/' + id);
    }

    const addSchool = () => {
        window.location = "/schools/add-school";
        // navigate('/schools/add-school');
    }

    const handleDeleteSchool = () => {
        if (deleteId != 0)
            deleteSchool(deleteId)
                .then(data => {
                    setMessage("School deleted successfully");
                    setSchools(schools.filter(s => s.id != deleteId));
                })
        setDeleteDialogOpen(false);
    }

    const openDeleteDialog = (id) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    } 

    const closeDeleteDialog = () => {
        setDeleteId(0);
        setDeleteDialogOpen(false);
    }

    useEffect(() => {
        reloadSchoolList()       
    }, [])

    return (
        <div style={{ padding: '80px 30px 0px 50px' }}>
            <Typography variant="h4" style={style}>Quản lý trường học</Typography>
            <Button variant="contained" color="primary" onClick={() => addSchool()}>
                Thêm trường học
            </Button>

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schools
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((school) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={school.id}>
                                            {columns.map((column) => {
                                                const value = school[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key='actions' align='center'>
                                                <Button variant="outlined" color="secondary" onClick={() => editSchool(school.id)}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                            <TableCell key='actions' align='center'>
                                                <Button variant="outlined" color="secondary" onClick={() => openDeleteDialog(school.id)}>
                                                    <DeleteIcon />
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
            {
                deleteDialogOpen && 
                <ConfirmDialog 
                    title="Xóa trường học"
                    detail="Bạn có chắc chắn muốn xóa trường học không?"
                    handleClose={closeDeleteDialog}
                    handleConfirm={handleDeleteSchool}
                />
            }
        </div>
    );
}

const style ={
    display: 'flex',
    justifyContent: 'left'
}