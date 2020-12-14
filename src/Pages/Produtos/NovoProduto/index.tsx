/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Paper,
  TextField,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { PhotoCamera, Add, Clear } from '@material-ui/icons';
import { Container } from './styles';
import { Categoria, Imagem } from '../../../Types';

import { getCategorias } from '../../../Api/Categorias';

import { sendImage } from '../../../Api/Imagens';

import { postProduto } from '../../../Api/Produtos';

const index = () => {
  const history = useHistory();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [listCategorias, setListCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<Imagem>();

  const cadastroProduto = async () => {
    try {
      const idCategorias = categorias.map((cat) => cat.id);
      if (imagem) {
        const response = await postProduto({
          categorias: idCategorias,
          descricao,
          nome,
          imagem_id: imagem.id,
        });

        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const list = async () => {
    try {
      const response = await getCategorias();

      setListCategorias(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      try {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        const response = await sendImage(data);
        setImagem(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Paper>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {imagem ? (
                <img src={`http://${imagem.url}`} alt="" width="300" height="300" />
              ) : (
                <>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleChange}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <TextField placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
              <div>
                <span>Categorias</span>
                <IconButton color="primary" component="span" onClick={() => setOpenModal(true)}>
                  <Add />
                </IconButton>
              </div>
              <div>
                {categorias.map((categoria, i) => (
                  <div key={`cat${categoria.id}`}>
                    <span>{categoria.nome}</span>
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={() => {
                        const listAux = categorias;
                        listAux.splice(i, 1);

                        setCategorias([...listAux]);
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => history.goBack()}>Voltar</Button>
              <Button onClick={cadastroProduto}>Cadastrar Produto</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cód</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {listCategorias.map((item) => (
                <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                  <TableCell>{item.id}</TableCell>

                  <TableCell>{item.nome}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        setCategorias(categorias.concat(item));
                        setOpenModal(false);
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
    </Container>
  );
};

export default index;
