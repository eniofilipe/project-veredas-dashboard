import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  InputAdornment,
  Backdrop,
  CircularProgress,
  Input,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { AddShoppingCart, ArrowBack, DeleteOutline, Save } from '@material-ui/icons';
import { Container, AddOrderContainer, WrapperButtons, WrapperValidade } from './styles';

import ModalProdutos from '../../__Modais/ListaProdutos';
import { Oferta, Produto, Validade } from '../../../Types';
import {
  getProdutosOfertas,
  setOferta,
  editOferta,
  deleteOferta,
  getOfertasOfValidade,
  editValidadeOferta,
} from '../../../Api/Ofertas';

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

const EditarOferta = () => {
  const history = useHistory();
  const location = useLocation<Validade>();
  const [selectedDate, setSelectedDate] = useState('');
  const [produtos, setProdutos] = useState<Oferta[]>([]);
  const [novosProdutos, setNovosProdutos] = useState<OfertaProd[]>([]);
  const [prodToDelete, setProdToDelete] = useState<Oferta[]>([]);
  const [openModalProduto, setOpenModalProduto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validade, setValidade] = useState(location.state);

  const carregaOfertas = async () => {
    try {
      setLoading(true);

      const response = await getOfertasOfValidade(validade.id);

      setProdutos([...response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromApi = (index: number) => {
    console.log(index);
    const auxToDelete = [...prodToDelete];

    auxToDelete.push(produtos[index]);

    const auxProdutos = [...produtos];

    auxProdutos.splice(index, 1);

    setProdToDelete(auxToDelete);
    setProdutos(auxProdutos);
  };

  const deleteFromNovos = (index: number) => {
    const aux = [...novosProdutos];

    aux.splice(index, 1);

    setNovosProdutos(aux);
  };

  useEffect(() => {
    carregaOfertas();
    setSelectedDate(validade.validade);
  }, [validade]);

  const editaOferta = async () => {
    try {
      setLoading(true);

      await editValidadeOferta({
        validade: selectedDate,
        validade_id: validade.id,
        status: validade.status,
      });

      produtos.map(async (prod) => {
        await editOferta({
          id: prod.id,
          quantidade: prod.quantidade,
          validade_oferta_id: validade.id,
          valor_unitario: Number(prod.valor_unitario),
        });
      });

      if (novosProdutos.length > 0) {
        novosProdutos.map(async (prod) => {
          await setOferta({
            produto_id: prod.produto.id,
            quantidade: prod.quantidade,
            validade_oferta_id: validade.id,
            valor_unitario: Number(prod.valor),
          });
        });
      }

      if (prodToDelete.length > 0) {
        prodToDelete.map(async (prod) => {
          await deleteOferta(prod.id);
        });
      }

      setLoading(false);
      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeQuantidade = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], quantidade: value };

    setProdutos([...prodAux]);
  };

  const changeValor = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], valor_unitario: value };

    setProdutos([...prodAux]);
  };

  const changeQuantidadeNovos = (value: number, pos: number) => {
    const prodAux = novosProdutos;

    prodAux[pos] = { ...novosProdutos[pos], quantidade: value };

    setNovosProdutos([...prodAux]);
  };

  const changeValorNovos = (value: number, pos: number) => {
    const prodAux = novosProdutos;

    prodAux[pos] = { ...novosProdutos[pos], valor: value };

    setNovosProdutos([...prodAux]);
  };

  return (
    <Container>
      <AddOrderContainer>
        <WrapperValidade>
          <span>Validade:</span>

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
        </WrapperValidade>

        <Button variant="contained" startIcon={<AddShoppingCart />} onClick={() => setOpenModalProduto(true)}>
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
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.produtos.nome}</TableCell>
                <TableCell align="center">{item.produtos.descricao}</TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-number"
                    type="number"
                    style={{ width: 60 }}
                    value={item.quantidade}
                    onChange={(e) => changeQuantidade(Math.trunc(Number(e.target.value)), pos)}
                    inputProps={{
                      'aria-disabled': true,
                      min: 1,
                      step: 1,
                      pattern: /\d/,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-start-adornment"
                    type="number"
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    value={item.valor_unitario}
                    style={{ width: 100 }}
                    onChange={(e) => changeValor(Number(e.target.value), pos)}
                    inputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={() => deleteFromApi(pos)}>
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {novosProdutos.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.produto.id}`}>
                <TableCell>{item.produto.nome}</TableCell>
                <TableCell align="center">{item.produto.descricao}</TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-number"
                    type="number"
                    style={{ width: 60 }}
                    value={item.quantidade}
                    onChange={(e) => changeQuantidadeNovos(Math.trunc(Number(e.target.value)), pos)}
                    inputProps={{
                      'aria-disabled': true,
                      min: 1,
                      step: 1,
                      pattern: /\d/,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-start-adornment"
                    type="number"
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    value={item.valor}
                    style={{ width: 100 }}
                    onChange={(e) => changeValorNovos(Number(e.target.value), pos)}
                    inputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={() => deleteFromNovos(pos)}>
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <WrapperButtons>
        <Button variant="contained" startIcon={<Save />} onClick={editaOferta}>
          Salvar
        </Button>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => history.goBack()}>
          Voltar
        </Button>
      </WrapperButtons>

      <ModalProdutos
        isOpen={openModalProduto}
        setModalClose={() => setOpenModalProduto(false)}
        selection={(prod) => {
          const prodOferta = {
            produto: prod,
            quantidade: 1,
            valor: 0,
          } as OfertaProd;
          setNovosProdutos(novosProdutos.concat(prodOferta));
        }}
      />
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default EditarOferta;
