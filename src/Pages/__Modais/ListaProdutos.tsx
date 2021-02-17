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
} from '@material-ui/core';

import { Check } from '@material-ui/icons';
import { Produto } from '../../Types';

import { getProduto } from '../../Api/Produtos';
import { StyledModal, WrapperContentModal } from './styles';

interface ListaProdutosProps {
  selection: (cliente: Produto) => void;
  isOpen: boolean;
  setModalClose: () => void;
}

const ListaProdutos = ({ selection, isOpen, setModalClose }: ListaProdutosProps) => {
  const [listProdutos, setListProdutos] = useState<Produto[]>([]);

  const list = async () => {
    try {
      const response = await getProduto();

      setListProdutos(response.data.produtos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list();
  }, []);

  useEffect(() => {
    console.log(listProdutos);
  }, [listProdutos]);

  return (

    <StyledModal open={isOpen} onClose={setModalClose}>
      <WrapperContentModal>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cód</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categorias</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {listProdutos.map((item) => (
                <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                  <TableCell>{item.id}</TableCell>

                  <TableCell>{item.nome}</TableCell>

                  <TableCell>{item.descricao}</TableCell>

                  <TableCell>
                    {item.categorias.map((category) => (
                      <Chip key={category.id} label={category.nome} />
                    ))}
                  </TableCell>
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

export default ListaProdutos;
