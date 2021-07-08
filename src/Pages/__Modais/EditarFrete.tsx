/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Grid,
  Backdrop,
  CircularProgress,
  InputAdornment,
  Input,
  Typography,
} from '@material-ui/core';

import { ArrowBackIos, Done } from '@material-ui/icons';
import { FormWrapper, StyledModal, Title, WrapperButtons, WrapperContentModal, WrapperTitle } from './styles';
import toasts from '../../Utilities/toasts';
import { putFrete } from '../../Api/Frete';

interface EditarFreteProps {
  value?: number;
  setModalClose: () => void;
  success?: () => void;
}

const EditarFrete = ({ value, setModalClose, success = () => {} }: EditarFreteProps) => {
  const [valorFrete, setValorFrete] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValorFrete(value);
  }, [value]);

  const editValueFrete = async () => {
    if (valorFrete && !loading) {
      try {
        setLoading(true);

        await putFrete(valorFrete);

        setLoading(false);
        toasts.success('Sucesso ao editar valor do frete', () => {
          success();
          setModalClose();
        });
      } catch (error) {
        toasts.error('Erro ao editar valor do frete');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <StyledModal open={!!value} onClose={setModalClose}>
      <WrapperContentModal style={{ overflow: 'unset' }}>
        <Paper>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <WrapperTitle>
                <Title>Editar valor do frete</Title>
              </WrapperTitle>
            </Grid>
            <Grid item xs={12}>
              <FormWrapper>
                <Input
                  startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                  type="number"
                  onChange={(e) => setValorFrete(Number(e.target.value))}
                  value={valorFrete}
                  defaultValue={valorFrete}
                  inputProps={{
                    min: 0,
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12}>
              <WrapperButtons>
                <Button startIcon={<Done />} variant="contained" type="submit" onClick={editValueFrete}>
                  Salvar valor
                </Button>
                <Button startIcon={<ArrowBackIos />} variant="contained" onClick={setModalClose}>
                  Voltar
                </Button>
              </WrapperButtons>
            </Grid>
          </Grid>
        </Paper>
        <Backdrop open={loading} style={{ zIndex: 10 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      </WrapperContentModal>
    </StyledModal>
  );
};

export default EditarFrete;
