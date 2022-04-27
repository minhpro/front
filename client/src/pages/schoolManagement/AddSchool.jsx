import { useState, useEffect } from "react"
import { makeStyles } from "@mui/styles";
import { TextField, MenuItem } from "@mui/material";
import { Button, Typography } from '@mui/material';
import { createSchool } from "api/schoolApi";

const useStyles = makeStyles({
    root: {

    }
})

const initialValues = {
    name: '',
    province: '',
    district: '',
    area: '',
    description: '',
    adminName: '',
    adminEmail: '',
    adminPassword: ''
}

const provinces = [
    "Hà Nội",
    "TP Hồ Chí Minh",
    "Hưng Yên"
]

const districts = {
    "Hà Nội": ["Cầu Giấy", "Hai Bà Trưng", "Long Biên"],
    "TP Hồ Chí Minh": ["Bình Thạnh", "Quận 10"],
    "Hưng Yên": ["Kim Động", "Văn Giang"]
}

const areas = {
    "Kim Động": ["Mai Động", "Hùng An", "Toàn Thắng"]
}

const noneSelectItem = <MenuItem key="none" value="">
                        <b>Không chọn</b>
                        </MenuItem>

export default function AddSchool() {

    const [values, setValues] = useState(initialValues);
    const classes = useStyles();

    const saveSchool = () => {
        createSchool(values)
        .then(data => {
            window.location = "/schools";
        })
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            <Typography variant="h4" style={style}>Thêm trường học</Typography>
            <form style={formContainer}>

                <TextField 
                type="text" 
                required
                label="Tên trường"
                fullWidth 
                margin="normal" 
                name="name" 
                value={values.name} 
                onChange={e => onChange(e)}/>

                <TextField 
                type="text" 
                select
                label="Tỉnh / Thành Phố" 
                fullWidth 
                margin="normal" 
                name="province" 
                value={values.province} 
                onChange={e => onChange(e)}>
                    {noneSelectItem}
                {provinces.map((p) => (
                    <MenuItem key={p} value={p}>
                    {p}
                    </MenuItem>
                ))}
                </TextField>

                <TextField 
                type="text" 
                select
                label="Quận / Huyện" 
                fullWidth 
                margin="normal" 
                name="district" 
                value={values.district} 
                onChange={e => onChange(e)}>
                    {noneSelectItem}
                {districts[values.province] != null && districts[values.province].map((p) => (
                    <MenuItem key={p} value={p}>
                    {p}
                    </MenuItem>
                ))}
                </TextField>

                <TextField 
                type="text" 
                select
                label="Xã / Phường" 
                fullWidth 
                margin="normal" 
                name="area" 
                value={values.area} 
                onChange={e => onChange(e)}>
                    {noneSelectItem}
                {areas[values.district] != null && areas[values.district].map((p) => (
                    <MenuItem key={p} value={p}>
                    {p}
                    </MenuItem>
                ))}
                </TextField>

                <TextField 
                type="text" 
                required
                label="Tên quản lý" 
                fullWidth 
                margin="normal" 
                name="adminName" 
                value={values.adminName} 
                onChange={e => onChange(e)}/>

                <TextField 
                type="text"
                required
                label="Email quản lý" 
                fullWidth 
                margin="normal" 
                name="adminEmail" 
                value={values.adminEmail} 
                onChange={e => onChange(e)}/>

                <TextField 
                type="password" 
                required
                label="Mật khẩu quản lý" 
                fullWidth 
                margin="normal" 
                name="adminPassword" 
                value={values.adminPassword} 
                onChange={e => onChange(e)}/>

                <Button variant="contained" color="primary" onClick={saveSchool}>Lưu</Button>
        </form>
    </div>
    )
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'left'

}