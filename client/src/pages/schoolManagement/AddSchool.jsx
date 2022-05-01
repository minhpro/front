import { useState, useEffect } from "react"
import { makeStyles } from "@mui/styles";
import { TextField, MenuItem } from "@mui/material";
import { Button, Typography } from '@mui/material';
import { createSchool, getAreaData } from "api/schoolApi";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const schoolTypes = [
    {value: 'ELEMENTARY', label: 'Tiểu học'},
    {value: 'MIDDLE', label: 'Trung học cơ sở'},
    {value: 'HIGH', label: 'Trung học phổ thông'},
    {value: 'COLLEGE', label: 'Cao đẳng'},
    {value: 'UNIVERSITY', label: 'Đại học'},
    {value: 'OTHER', label: 'Loại khác'},
]

const initialValues = {
    name: '',
    description: '',
    type: 'ELEMENTARY',
    provinceId: null,
    districtId: null,
    wardId: null,
    adminName: '',
    adminEmail: '',
    adminPassword: ''
}

const noneSelectItem = (key, value) => <MenuItem key={key} value={value}>
                        <b>Không chọn</b>
                        </MenuItem>

const noneSelectIdItem = noneSelectItem(0, 0);

export default function AddSchool() {

    const [values, setValues] = useState(initialValues);
    const classes = useStyles();
    const [areaData, setAreaData] = useState(null);

    useEffect(() => {
        getAreaData()
        .then(data => {
            setAreaData(data);
        })
    }, [])

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
        <div className={classes.pageContent}>
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
                required
                select
                label="Cấp trường"
                fullWidth 
                margin="normal" 
                name="type" 
                value={values.type} 
                onChange={e => onChange(e)}>
                    {schoolTypes.map(p => (
                        <MenuItem key={p.value} value={p.value}>
                            {p.label}
                        </MenuItem>
                    ))

                    }
                </TextField>

                <TextField 
                type="text" 
                // style={{width: 200}}
                multiline
                rows={4}
                label="Mô tả"
                fullWidth 
                margin="normal" 
                name="description" 
                value={values.description} 
                onChange={e => onChange(e)}/>

                <TextField 
                type="text" 
                select
                label="Tỉnh / Thành Phố" 
                fullWidth 
                margin="normal" 
                name="provinceId" 
                value={values.provinceId} 
                onChange={e => onChange(e)}>
                    {noneSelectIdItem}
                {areaData != null && areaData.provinces.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                    {p.name}
                    </MenuItem>
                ))}
                </TextField>

                <TextField 
                type="text" 
                select
                label="Quận / Huyện" 
                fullWidth 
                margin="normal" 
                name="districtId" 
                value={values.districtId} 
                onChange={e => onChange(e)}>
                    {noneSelectIdItem}
                {areaData != null && values.provinceId != null && 
                areaData.districts.filter(x => x.provinceId == values.provinceId)
                .map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                    {p.prefix + " " + p.name}
                    </MenuItem>
                ))}
                </TextField>

                <TextField 
                type="text" 
                select
                label="Xã / Phường" 
                fullWidth 
                margin="normal" 
                name="wardId" 
                value={values.wardId} 
                onChange={e => onChange(e)}>
                    {noneSelectIdItem}
                {areaData != null && values.districtId != null && 
                areaData.wards.filter(x => x.districtId == values.districtId)
                .map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                    {p.prefix + " " + p.name}
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