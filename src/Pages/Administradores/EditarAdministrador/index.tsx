import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { DevTool } from '@hookform/devtools';
import {
  Button,
  Paper,
  TextField,
  Grid,
  // IconButton,
  // Modal,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Chip,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { ArrowBackIos, Done } from '@material-ui/icons';
import { Container, WrapperButtons, FormWrapper } from './styles';

import { putAdministriador } from '../../../Api/Administradores';

import { AdministradorValidation } from './validation';
import { Administrador } from '../../../Types';
import toast from '../../../Utilities/toasts';

interface FormShape {
  nomeAdm: string;
  emailAdm: string;
  senhaAntiga: string;
  senhaAdm: string;
  repeatSenhaAdm: string;
}

const EditarAdministrador = () => {
  const history = useHistory();
  const location = useLocation<Administrador>();
  const { register, handleSubmit, errors, control } = useForm<FormShape>({
    resolver: yupResolver(AdministradorValidation),
    defaultValues: {
      emailAdm: location.state.email,
      nomeAdm: location.state.nome,
    },
  });

  const [isLoading, setLoading] = useState(false);

  const editarAdmninistrador = async (data: FormShape) => {
    try {
      setLoading(true);

      const response = await putAdministriador(data.nomeAdm, data.emailAdm, data.senhaAntiga, data.senhaAdm);

      history.goBack();
    } catch (error) {
      toast.error('Erro ao editar dados do administrador, verifique os dados inseridos!');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) return;

    await editarAdmninistrador(data);
  });

  return (
    <Container>
      <Paper>
        <form onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormWrapper>
                <TextField
                  id="asdjalsjdlaksjdlakjs"
                  placeholder="Nome"
                  fullWidth
                  inputProps={{
                    name: 'nomeAdm',
                    ref: register,
                  }}
                  error={!!errors.nomeAdm}
                  helperText={errors.nomeAdm?.message}
                />
                <TextField
                  id="emailAdm"
                  placeholder="Email"
                  fullWidth
                  inputProps={{
                    name: 'emailAdm',
                    ref: register,
                  }}
                  type="email"
                  error={!!errors.emailAdm}
                  helperText={errors.emailAdm?.message}
                />
                <TextField
                  placeholder="Senha antiga"
                  fullWidth
                  inputProps={{
                    name: 'senhaAntiga',
                    ref: register,
                  }}
                  id="senhaAntiga"
                  type="password"
                  error={!!errors.senhaAntiga}
                  helperText={errors.senhaAntiga?.message}
                />
                <TextField
                  placeholder="Nova Senha"
                  fullWidth
                  inputProps={{
                    name: 'senhaAdm',
                    ref: register,
                  }}
                  id="senhaAdm"
                  type="password"
                  error={!!errors.senhaAdm}
                  helperText={errors.senhaAdm?.message}
                />
                <TextField
                  placeholder="Repetir nova senha"
                  fullWidth
                  inputProps={{
                    name: 'repeatSenhaAdm',
                    ref: register,
                  }}
                  type="password"
                  error={!!errors.repeatSenhaAdm}
                  helperText={errors.repeatSenhaAdm?.message}
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12}>
              <WrapperButtons>
                <Button startIcon={<Done />} variant="contained" type="submit">
                  Salvar administrador
                </Button>
                <Button startIcon={<ArrowBackIos />} variant="contained" onClick={() => history.goBack()}>
                  Voltar
                </Button>
              </WrapperButtons>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Backdrop open={isLoading} style={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default EditarAdministrador;
