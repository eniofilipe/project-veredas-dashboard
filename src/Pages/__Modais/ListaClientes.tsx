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
} from '@material-ui/core';

import { Check } from '@material-ui/icons';
import { Cliente } from '../../Types';

import { getClientes } from '../../Api/Clientes';
import { StyledModal, WrapperContentModal } from './styles';

interface ListaClientesProps {
  selection: (cliente: Cliente) => void;
  isOpen: boolean;
  setModalClose: () => void;
}

const ListaClientes = ({ selection, isOpen, setModalClose }: ListaClientesProps) => {
  const [listClientes, setListClientes] = useState<Cliente[]>([]);

  const list = async () => {
    try {
      const response = await getClientes();

      setListClientes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <StyledModal open={isOpen} onClose={setModalClose}>
      <WrapperContentModal>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cód</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {listClientes.map((item) => (
                <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                  <TableCell>{item.id}</TableCell>

                  <TableCell>{item.nome}</TableCell>

                  <TableCell>{item.enderecos.logradouro}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<Check />}
                      onClick={() => {
                        selection(item);
                        setModalClose();
                      }}
                    >
                      Selecionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow />
            </TableBody>
          </Table>
        </TableContainer>
      </WrapperContentModal>
    </StyledModal>
  );
};

export default ListaClientes;
