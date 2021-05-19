import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import gerarRelatoriosPedidos from './RelatorioPedidos';
import gerarRelatoriosProdutos from './RelatorioProdutos';

const Relatorios = () => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setOption(0);
  };

  const handleOpen = (op: number) => {
    setOption(op);
    setOpen(true);
  };

  const confirm = async () => {
    try {
      if (option === 1) {
        await gerarRelatoriosPedidos();
      }
      if (option === 2) {
        await gerarRelatoriosProdutos();
      }

      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper>
      <Button onClick={() => handleOpen(1)}>Gerar Relatório Pedidos</Button>
      <Button onClick={() => handleOpen(2)}>Gerar Relatório Produtos</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deseja gerar relatório?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Caso exista alguma oferta em aberto, ao gerar um relatório essa oferta será fechada. Tem certeza que deseja
            gerar relatório?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirm} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Relatorios;
