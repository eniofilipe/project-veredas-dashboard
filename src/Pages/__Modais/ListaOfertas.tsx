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

import { Oferta } from '../../Types';

import { getProdutosOfertas } from '../../Api/Ofertas';

interface ListaOfertasProps {
  selection: (cliente: Oferta) => void;
  isOpen: boolean;
  setModalClose: () => void;
}

const ListaOfertas = ({ selection, isOpen, setModalClose }: ListaOfertasProps) => {
  const [listOfertas, setListOfertas] = useState<Oferta[]>([]);

  const list = async () => {
    try {
      const response = await getProdutosOfertas();

      setListOfertas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <Modal open={isOpen} onClose={setModalClose}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cód</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Val Unit</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfertas.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>

                <TableCell>{item.produtos.nome}</TableCell>

                <TableCell>{item.produtos.descricao}</TableCell>

                <TableCell>{item.quantidade}</TableCell>

                <TableCell>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_unitario)}
                </TableCell>

                <TableCell>
                  <Button
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
    </Modal>
  );
};

export default ListaOfertas;
