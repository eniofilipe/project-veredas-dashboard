import React, { useState, useEffect } from 'react';
import { Button, CardActions, CardContent, CardHeader, Grid } from '@material-ui/core';
import { StyledCard, Titulo, Container, HeaderDashboard, CardInformacao, BodyDashboard, Info } from './styles';

import { Pedido, Produto, ResponseProduto, Cliente } from '../../Types';
import { getPedidos } from '../../Api/Pedido';
import { getProduto } from '../../Api/Produtos';
import { getClientes } from '../../Api/Clientes';
import EditarFrete from '../__Modais/EditarFrete';
import { getFrete } from '../../Api/Frete';

const index = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<ResponseProduto>();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [valorFrete, setValorFrete] = useState<number>();
  const [openEditFrete, setOpenEditFrete] = useState<number>();

  const counts = async () => {
    try {
      const responsepedidos = await getPedidos();
      setPedidos(responsepedidos.data);

      const responseprodutos = await getProduto();
      setProdutos(responseprodutos.data);

      const responseclientes = await getClientes();
      setClientes(responseclientes.data);

      const responseFrete = await getFrete();
      setValorFrete(responseFrete.data[0].valor_frete);
    } catch (error) {
      console.log(error);
    }
  };

  const valorFreteFormat = valorFrete
    ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorFrete)
    : '';

  useEffect(() => {
    counts();
  }, []);

  return (
    <Container>
      <HeaderDashboard>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <StyledCard>
              <CardHeader title="Pedidos Efetuados" />
              <CardContent>
                <Info>{pedidos.length}</Info>
              </CardContent>
              <CardActions />
            </StyledCard>
          </Grid>

          <Grid item xs={3}>
            <StyledCard>
              <CardHeader title="Produtos Disponíveis" />
              <CardContent>
                <Info>{produtos?.produtos.length}</Info>
              </CardContent>
              <CardActions />
            </StyledCard>
          </Grid>
          <Grid item xs={3}>
            <StyledCard>
              <CardHeader title="Clientes" />
              <CardContent>
                <Info>{clientes.length}</Info>
              </CardContent>
              <CardActions />
            </StyledCard>
          </Grid>
          <Grid item xs={3}>
            <StyledCard>
              <CardHeader title="Frete" />
              <CardContent>
                <Info>{valorFreteFormat}</Info>
              </CardContent>
              <CardActions>
                <Button onClick={() => setOpenEditFrete(valorFrete)}>Mudar valor do frete</Button>
              </CardActions>
            </StyledCard>
          </Grid>
        </Grid>
      </HeaderDashboard>
      <BodyDashboard>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <CardInformacao>
              <CardHeader title="Informações" />
            </CardInformacao>
          </Grid>
          <Grid item xs={3}>
            <StyledCard>
              <CardHeader title="Frete" />
              <CardContent>
                <Button>Produtos</Button> <p />
                <Button>Pedidos</Button> <p />
              </CardContent>
              <CardActions />
            </StyledCard>
          </Grid>
        </Grid>
      </BodyDashboard>
      <EditarFrete value={openEditFrete} setModalClose={() => setOpenEditFrete(undefined)} success={counts} />
    </Container>
  );
};

export default index;
