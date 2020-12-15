import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  Paper,
  TextField,
  Input,
  InputAdornment,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AddOrderContainer, ValidateContainer, OptionsContainer } from './styles';

import ModalProdutos from '../../__Modais/ListaProdutos';
import { Produto } from '../../../Types';
import { setOferta, setValidadeOferta } from '../../../Api/Ofertas';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

interface OfertaProd {
  produto: Produto;
  quantidade: number;
  valor: number;
}

const NovaOferta = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState('');
  const [produtos, setProdutos] = useState<OfertaProd[]>([]);
  const [openModalProduto, setOpenModalProduto] = useState(false);

  const cadastraOferta = async () => {
    try {
      const responseValidade = await setValidadeOferta({ validade: selectedDate });

      const idOferta = responseValidade.data.id;

      produtos.map(async (prod) => {
        await setOferta({
          produto_id: prod.produto.id,
          quantidade: prod.quantidade,
          validade_oferta_id: idOferta,
          valor_unitario: Number(prod.valor),
        });
      });

      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const changeQuantidade = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], quantidade: value };

    setProdutos([...prodAux]);
  };

  const changeValor = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], valor: value };

    setProdutos([...prodAux]);
  };

  return (
    <Container>
      <AddOrderContainer>
        <ValidateContainer>
          Validade:&emsp;
          <TextField
            type="date"
            value={dayjs(selectedDate).format('YYYY-MM-DD')}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ValidateContainer>
        <Button variant="contained" onClick={() => setOpenModalProduto(true)}>
          Adicionar Produto
        </Button>
      </AddOrderContainer>
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.produto.id}`}>
                <TableCell>{item.produto.nome}</TableCell>
                <TableCell align="center">{item.produto.descricao}</TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-number"
                    type="number"
                    style={{ width: 60 }}
                    value={item.quantidade}
                    onChange={(e) => changeQuantidade(Number(e.target.value), pos)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-start-adornment"
                    type="number"
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    value={item.valor}
                    style={{ width: 100 }}
                    onChange={(e) => changeValor(Number(e.target.value), pos)}
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <p />
      <OptionsContainer>
        <Button variant="contained" onClick={() => history.goBack()}>
          Voltar
        </Button>
        &emsp;
        <Button variant="contained" onClick={() => cadastraOferta()}>
          Salvar
        </Button>
      </OptionsContainer>

      <ModalProdutos
        isOpen={openModalProduto}
        setModalClose={() => setOpenModalProduto(false)}
        selection={(prod) => {
          const prodOferta = {
            produto: prod,
            quantidade: 1,
            valor: 0,
          } as OfertaProd;
          setProdutos(produtos.concat(prodOferta));
        }}
      />
    </Container>
  );
};

export default NovaOferta;
