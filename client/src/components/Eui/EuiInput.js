import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import * as Mui from "@mui/material";

export const EuiInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

EuiInput.Multiline = function ({ ...rest }) {
  return (
    <Mui.TextField
      id="outlined-textarea"
      multiline
      sx={{ "& .MuiInputBase-input": { fontSize: 16 } }}
      {...rest}
    />
  );
};

EuiInput.Select = function ({ data, ...rest }) {
  return (
    <Mui.FormControl sx={{ m: 1, minWidth: 120 }}>
      <Mui.Select
        sx={{
          "& .MuiInputBase-input": {
            fontSize: 16,
            padding: "10px 12px",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        {...rest}
      >
        <Mui.MenuItem value={""}>
          <em>Chưa chọn</em>
        </Mui.MenuItem>
        {data
          ? data.map((data, i) => {
              return (
                <Mui.MenuItem key={i} value={data.id}>
                  {data.name}
                </Mui.MenuItem>
              );
            })
          : null}
      </Mui.Select>
      {/* <Mui.FormHelperText>Without label</Mui.FormHelperText> */}
    </Mui.FormControl>
  );
};

EuiInput.SelectBasic = function ({ children, ...rest }) {
  return (
    <Mui.FormControl sx={{ m: 1, minWidth: 120 }}>
      <Mui.Select
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        {...rest}
      >
        <Mui.MenuItem value="">
          <em>None</em>
        </Mui.MenuItem>
        {children}
      </Mui.Select>
      {/* <Mui.FormHelperText>Without label</Mui.FormHelperText> */}
    </Mui.FormControl>
  );
};

EuiInput.Icon = function (props) {
  const { name, label, value, onChange, ...rest } = props;
  return (
    <Mui.TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      // {...(error && { error: true, helperText: error })}
      required
      fullWidth
      color="secondary"
      {...rest}
      sx={{
        input: { fontSize: "2rem" },
        svg: { fontSize: "30px" },
        label: { color: "black", fontSize: "1.6rem" },
      }}
    />
  );
};

EuiInput.Radio = function ({ data, ...rest }) {
  return (
    <Mui.FormControl sx={{ m: 1, minWidth: 120 }}>
      {/* <Mui.FormLabel id="demo-radio-buttons-group-label">Gender</Mui.FormLabel> */}
      <Mui.RadioGroup
        // aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue={0}
        // name="radio-buttons-group"
        row
        {...rest}
      >
        {data
          ? data.map((data, i) => {
              return (
                <Mui.FormControlLabel
                  value={data.id}
                  control={<Mui.Radio />}
                  label={data.name}
                  key={i}
                />
              );
            })
          : null}
      </Mui.RadioGroup>
    </Mui.FormControl>
  );
};
