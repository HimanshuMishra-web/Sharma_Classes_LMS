import React, {useState} from "react";
import {
    Grid,
    InputLabel,
    TextField,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton, Card, Box
} from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material";
import loginSvg from "../assets/login.svg";
import {useFormik} from "formik";
import {$crud} from "../services/crud";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const {handleChange, handleSubmit, values} = useFormik({
        initialValues: {
            mobile: "",
            password: ""
        },
        onSubmit:async (values) => {
            try{
                const {data: {token, user}} = await $crud.post("/auth/login",values);
                localStorage.setItem("token",`Bearer ${token}`);
                localStorage.setItem("user",JSON.stringify(user));
            }catch(error){
                console.error(error.message)
            }
        }
    });
    return (
        <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
            <Grid
                container
                component={Card}
                maxWidth="md"
                // py={8}
                sx={{boxShadow:theme=>theme.shadows[12]}}
            >
                <Grid item  sm={12} md={6} display="flex"  justifyContent="center" px={6} py={10} sx={{backgroundColor: theme => theme.customColors.primaryBackgroundLight,}}>
                    <img src={loginSvg} style={{height:"100%", aspectRatio: "1"}}/>
                </Grid>
                <Grid item  sm={12} md={6} display="flex" alignItems="center" justifyContent="center" px={6} py={10} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Mobile"
                                fullWidth
                                type="number"
                                name="mobile"
                                value={values?.mobile || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={handleChange}
                                    fullWidth
                                    value={values?.password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" onClick={handleSubmit} size="large">Login</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>

    )
}