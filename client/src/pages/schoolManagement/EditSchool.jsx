import { useState, useEffect } from "react"
import { makeStyles } from "@mui/styles";
import { TextField, MenuItem } from "@mui/material";
import { Button, Typography } from '@mui/material';
import { editSchool, getSchool, getAreaData } from "api/schoolApi";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
    root: {

    }
})

const initialValues = {
    name: '',
    provinceId: null,
    districtId: null,
    wardId: null,
    description: ''
}

const noneSelectItem = (key, value) => <MenuItem key={key} value={value}>
                        <b>Không chọn</b>
                        </MenuItem>

const noneSelectIdItem = noneSelectItem(0, 0);

export default function EditSchool() {
    const { id } = useParams();

    const [values, setValues] = useState(initialValues);
    const [areaData, setAreaData] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        getAreaData()
        .then(data => {
            setAreaData(data);
        })
    }, [])

    useEffect(() => {
        getSchool(id)
        .then(data => {
            setValues({
                name: data.name,
                description: data.description,
                provinceId: data.province.id,
                districtId: data.district.id,
                wardId: data.ward.id
            });
        })  
    }, [])

    const saveSchool = () => {
        editSchool(id, values)
        .then(res => {
            window.location = "/schools";
        })
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        e.prevenDefault();
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
                value={values.provinceId || 0} 
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
                value={values.districtId || 0} 
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
                value={values.wardId || 0} 
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