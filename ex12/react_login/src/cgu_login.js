import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 3 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://www.cgu.edu.tw/">
        CGU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function CGU_Login() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    alert('Sign in button clicked!');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box className="login-page">
        {/* 左邊圖片區：對應老師 PDF 常見登入畫面的 IU 圖 */}
        <Box className="login-image" />

        {/* 右邊登入表單區 */}
        <Paper className="login-paper" elevation={6} square>
          <Box className="login-box">
            <Avatar className="login-avatar">
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in CSIE@CGU
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className="login-form"
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-submit"
              >
                SIGN IN
              </Button>

              <Box className="login-links">
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>

                <Link href="#" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Box>

              <Copyright />
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default CGU_Login;