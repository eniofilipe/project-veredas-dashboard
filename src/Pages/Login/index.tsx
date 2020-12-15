import React, { useContext, useState } from 'react';

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
import AuthContext from '../../Contexts/auth';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    <Link color="inherit" href="https://material-ui.com/">
      Veredas da Terra &emsp;
    </Link>
    {new Date().getFullYear()}.
  </Typography>
);

const index = () => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');

  const handleLogin = async () => {
    await signIn({
      email,
      password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <AvatarLogin>
          <LockOutlinedIcon />
        </AvatarLogin>
        <Typography component="h1" variant="h5">
          Acessar - Administrador
        </Typography>
        <Form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembrar-Me" />
          <ButtonSubmit fullWidth variant="contained" color="primary" onClick={() => handleLogin()}>
            Acessar
          </ButtonSubmit>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                Não tem conta? Criar Nova
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
};

export default index;
