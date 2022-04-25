import React from "react"
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

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

export default function AddSchoolForm() {

    const [values, setValues] = React.useState(initialValues);
    const classes = useStyles();

    return (
        <form className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField id="name" label="Tên trường" variant="outlined" value={values.name}/>
                    <TextField id="description" label="Mô tả" variant="outlined" value={values.description}/>
                </Grid>
            </Grid>
        </form>
    )
}