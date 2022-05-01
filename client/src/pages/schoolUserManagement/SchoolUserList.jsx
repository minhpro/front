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
import { useParams } from "react-router-dom";
import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import { getSchoolUserList, removeSchoolUser } from 'api/schoolUserApi';

const columns = [
    { id: 'id', label: 'Id', minWidth: 10 },
    {
        id: 'fullName',
        label: 'Tên',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'birthdate',
        label: 'Ngày sinh',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'role',
        label: 'Vai trò',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    },
    {
        id: 'school',
        label: 'Trường',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('vi-vn'),
    }
];

const memberRoles = [
    {value: 'ADMIN', label: 'Quản lý'},
    {value: 'TEACHER', label: 'Giáo viên'},
    {value: 'STUDENT', label: 'Học sinh'},
    {value: 'TA', label: 'Trợ giảng'},
    {value: 'OBSERVER', label: 'Giám sát'},
    {value: 'OTHER', label: 'Loại khác'},
]

function getMemberRoleLabel(role) {
    let memberRole = memberRoles.find(x => x.value == role);
    if (memberRole != undefined)
        return memberRole.label;
    return 'Loại khác';
}


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function SchoolUserList() {
    const classes = useStyles();
    const { schoolId } = useParams();

    const [users, setUsers] = useState([]);
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

    const reloadUserList = () => {
        getSchoolUserList(schoolId)
            .then(body => {
                setUsers(body.data)
            }) 
    }

    const editSchoolUser = (id) => {
        window.location = "/schools/" + schoolId + "/users/edit-user/" + id;
    }

    const addSchoolUser = () => {
        window.location = "/schools/" + schoolId + "/users/add-user";
    }

    const handleDeleteSchoolUser = () => {
        if (deleteId != 0)
            removeSchoolUser(deleteId)
                .then(data => {
                    setMessage("School user deleted successfully");
                    setUsers(users.filter(s => s.id != deleteId));
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
        reloadUserList()       
    }, [])

    return (
        <div style={{ padding: '80px 30px 0px 50px' }}>
            <Typography variant="h4" style={style}>Quản lý thành viên</Typography>
            <Button variant="contained" color="primary" onClick={() => addSchoolUser()}>
                Thêm thành viên
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
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                            {columns.map((column) => {
                                                let value = null;
                                                if (column.id == 'school')
                                                    value = user.school != undefined ? user.school.name : '';
                                                else if (column.id == 'role')
                                                    value = getMemberRoleLabel(user.role);
                                                else
                                                    value = user[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key='actions' align='center'>
                                                <Button variant="outlined" color="secondary" onClick={() => editSchoolUser(user.id)}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                            <TableCell key='actions' align='center'>
                                                <Button variant="outlined" color="secondary" onClick={() => openDeleteDialog(user.id)}>
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
                    count={users.length}
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
                    title="Xóa thành viên"
                    detail="Bạn có chắc chắn muốn xóa thành viên không?"
                    handleClose={closeDeleteDialog}
                    handleConfirm={handleDeleteSchoolUser}
                />
            }
        </div>
    );
}

const style ={
    display: 'flex',
    justifyContent: 'left'
}