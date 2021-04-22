import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowBackIos, Done } from '@material-ui/icons';
import { Button, Paper, TextField, Grid, Backdrop, CircularProgress } from '@material-ui/core';
import { Container, WrapperButtons, FormWrapper } from './styles';
import { editCategoria } from '../../../Api/Categorias';
import { PutCategoriaProps, Categoria } from '../../../Types';

interface FormShape {
  nome: string;
  // eslint-disable-next-line camelcase
  categoria_id: number;
  isvalid: boolean;
}

const EditarCategoria = () => {
  const history = useHistory();
  const location = useLocation<Categoria>();
  const [nomeCategoria, setNomeCategoria] = useState<string>('');

  const { register, handleSubmit } = useForm<Categoria>({
    defaultValues: {
      id: location.state.id,
      nome: location.state.nome,
      isvalid: location.state.isvalid,
    },
  });

  const [isLoading, setLoading] = useState(false);

  const editarCategoria = async () => {
    try {
      setLoading(true);

      await editCategoria(nomeCategoria, location.state.id, true);

      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit(async () => {
    if (isLoading) return;

    await editarCategoria();
  });

  return (
    <Container>
      <Paper>
        <form onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormWrapper>
                <TextField
                  inputProps={{
                    name: 'nome',
                    ref: register,
                  }}
                  placeholder="Categoria"
                  fullWidth
                  onChange={(e) => setNomeCategoria(e.target.value)}
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12}>
              <WrapperButtons>
                <Button startIcon={<Done />} variant="contained" type="submit" onClick={() => onSubmit()}>
                  Salvar Categoria
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

export default EditarCategoria;
