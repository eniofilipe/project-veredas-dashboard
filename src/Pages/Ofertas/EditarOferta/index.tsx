/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  Button,
  Paper,
  Input,
  InputAdornment,
} from '@material-ui/core';
import { Container, ButtonContainer } from './styles';
import { Oferta } from '../../../Types';
import { getProdutosOfertas, putOferta } from '../../../Api/Ofertas';

const index = () => {
  const history = useHistory();
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

  const listProdutos = async () => {
    try {
      const response = await getProdutosOfertas();

      setOfertas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeQuantidade = (value: number, pos: number) => {
    const prodAux = ofertas;

    prodAux[pos] = { ...ofertas[pos], quantidade: value };

    setOfertas([...prodAux]);
  };

  const changeValor = (value: number, pos: number) => {
    const prodAux = ofertas;

    prodAux[pos] = { ...ofertas[pos], valor_unitario: value };

    setOfertas([...prodAux]);
  };

  const editarOferta = async () => {
    try{
        
      ofertas.map(async (item) => { 
          await putOferta({
          id: item.id,
          quantidade: item.quantidade,
          valor_unitario: Number(item.valor_unitario),
          validade_oferta_id: item.validade.id,
        });
      });

      history.goBack();
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    listProdutos();
  }, []);

  return (
    <Container>
      {/* <ButtonContainer>
        <Button variant="contained">Adicionar Produto</Button>
      </ButtonContainer> */}
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Unitário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas.map((item, pos) => (              
              <TableRow hover key={`cod${item.produtos.id}`}>
                <TableCell>{item.produtos.id}</TableCell>
                <TableCell>{item.produtos.nome}</TableCell>
                <TableCell>{item.produtos.descricao}</TableCell>
                <TableCell>{item.produtos.categorias.map((category) => `${category.nome}, `)}</TableCell>
                <TableCell>
                  <Input 
                    id="standard-number" 
                    type="number" 
                    value={item.quantidade} 
                    style={{ width: 100 }}
                    onChange={(e) => changeQuantidade(Number(e.target.value), pos)}
                  />
                </TableCell>
                <TableCell>                  
                  <Input 
                    id="standard-number" 
                    type="number" 
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    style={{ width: 100 }}
                    value={item.valor_unitario} 
                    onChange={(e) => changeValor(Number(e.target.value), pos)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p />
      <ButtonContainer>
        <Button variant="contained" onClick={() => editarOferta()}>Salvar</Button>
      </ButtonContainer>
    </Container>
  );
};

export default index;
