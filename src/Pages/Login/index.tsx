import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper, AvatarLogin, Form, ButtonSubmit } from './styles';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Your Website
    </Link>
    {new Date().getFullYear()}.
  </Typography>
);

const index = () => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Paper>
      <AvatarLogin>
        <LockOutlinedIcon />
      </AvatarLogin>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form noValidate>
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
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <ButtonSubmit type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </ButtonSubmit>
        <Grid container>
          <Grid item>
            <Link href="/" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Form>
    </Paper>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>
);
export default index;
