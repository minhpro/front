import { useState, useEffect } from "react"
import { makeStyles } from "@mui/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem } from "@mui/material";
import { Button, Typography } from '@mui/material';
import { addSchoolUser, updateSchoolUser } from "api/schoolUserApi";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const memberRoles = [
    { value: 'ADMIN', label: 'Quản lý' },
    { value: 'TEACHER', label: 'Giáo viên' },
    { value: 'STUDENT', label: 'Học sinh' },
    { value: 'TA', label: 'Trợ giảng' },
    { value: 'OBSERVER', label: 'Giám sát' },
    { value: 'OTHER', label: 'Loại khác' },
]

function getMemberRoleLabel(role) {
    let memberRole = memberRoles.find(x => x.value == role);
    if (memberRole != undefined)
        return memberRole.label;
    return 'Loại khác';
}

const initialValues = {
    name: '',
    birthDate: new Date(),
    email: '',
    password: '',
    role: 'STUDENT'
}

export default function EditSchoolUser() {

    const { schoolId, id } = useParams();

    const [values, setValues] = useState(initialValues);
    const classes = useStyles();

    // useEffect(() => {
    //     getSchool(id)
    //     .then(data => {
    //         setValues({
    //             name: data.name,
    //             description: data.description,
    //             provinceId: data.province.id,
    //             districtId: data.district.id,
    //             wardId: data.ward.id
    //         });
    //     })  
    // }, [])

    const saveSchoolUser = () => {
        updateSchoolUser(schoolId, id, values)
            .then(data => {
                window.location = "/schools/" + schoolId + "/users";
            })
    }

    const onChangeBirthDate = (birthDateValue) => {
        setValues({
            ...values,
            birthDate: birthDateValue
        });
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={classes.pageContent}>
            <Typography variant="h4" style={style}>Thêm trường học</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form style={formContainer}>

                    <TextField
                        type="text"
                        required
                        label="Tên"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={values.name}
                        onChange={e => onChange(e)} />
                    <DatePicker
                        disableFuture
                        name="birthDate"
                        label="Ngày sinh"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={values.birthDate}
                        onChange={(newValue) => onChangeBirthDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <TextField
                        type="text"
                        required
                        label="Email"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={values.email}
                        onChange={e => onChange(e)} />

                    <TextField
                        type="password"
                        required
                        label="Mật khẩu"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={values.password}
                        onChange={e => onChange(e)} />

                    <TextField
                        type="text"
                        select
                        label="Vai trò"
                        fullWidth
                        margin="normal"
                        name="role"
                        value={values.role}
                        onChange={e => onChange(e)}>
                        {memberRoles.map((p) => (
                            <MenuItem key={p.value} value={p.value}>
                                {p.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="contained" color="primary" onClick={saveSchoolUser}>Lưu</Button>
                </form>
            </LocalizationProvider>

        </div>
    )
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style = {
    display: 'flex',
    justifyContent: 'left'

}