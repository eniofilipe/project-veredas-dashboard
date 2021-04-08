/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  Chip,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { PhotoCamera, Add, Clear, ArrowBackIos, Done } from '@material-ui/icons';
import {
  Container,
  PictureContainer,
  WrapperButtons,
  FormWrapper,
  WrapperContentModal,
  StyledModal,
  LabelError,
} from './styles';

import { Categoria, Imagem, Produto } from '../../../Types';

import { getCategorias } from '../../../Api/Categorias';

import { sendImage } from '../../../Api/Imagens';

import { editProduto } from '../../../Api/Produtos';

import { ProductValidation } from './validation';

interface FormShape {
  nome: string;
  descricao: string;
  categorias: Categoria[];
  imagem: Imagem;
}

const index = () => {
  const history = useHistory();
  const location = useLocation<Produto>();

  const [productState, setProduct] = useState<Produto>(location.state);

  const { register, handleSubmit, errors, reset, watch, setValue, formState, control } = useForm<FormShape>({
    resolver: yupResolver(ProductValidation),
    defaultValues: { ...productState },
  });

  const categorias = watch('categorias');
  const imagem = watch('imagem');

  const [openModal, setOpenModal] = useState(false);
  const [listCategorias, setListCategorias] = useState<Categoria[]>([]);
  const [isLoading, setLoading] = useState(false);

  const salvarProduto = async (data: FormShape) => {
    try {
      setLoading(true);
      const idCategorias = data.categorias.map((cat) => cat.id);

      if (data.imagem) {
        const response = await editProduto({
          categorias: idCategorias,
          descricao: data.descricao,
          nome: data.nome,
          id: location.state.id,
          imagem_id: data.imagem.id,
        });

        history.goBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const list = async () => {
    try {
      setLoading(true);
      const response = await getCategorias();

      setListCategorias(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    list();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      try {
        setLoading(true);
        const data = new FormData();

        data.append('file', e.target.files[0]);

        const response = await sendImage(data);
        setValue('imagem', response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) return;

    await salvarProduto(data);
  });

  const removeCategoria = (indexVector: number) => {
    const listAux = [...categorias];
    listAux.splice(indexVector, 1);

    setValue('categorias', [...listAux]);
  };

  const addCategoria = (item: Categoria) => {
    if (categorias) {
      const listAux = categorias;
      listAux.push(item);

      setValue('categorias', [...listAux]);
    } else {
      const listAux = [item];
      setValue('categorias', [...listAux]);
    }
  };

  useEffect(() => {
    register('categorias');
    register('imagem');

    setValue('categorias', [...productState.categorias]);
  }, [register, productState]);

  /* useEffect(() => {}, [reset, productState]); */

  return (
    <Container>
      <Paper>
        <form onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <PictureContainer>
                {imagem ? (
                  <img src={`${imagem.url}`} alt="" />
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
              </PictureContainer>
            </Grid>
            <Grid item xs={9}>
              <FormWrapper>
                <TextField
                  placeholder="Nome"
                  fullWidth
                  inputRef={register}
                  name="nome"
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                />
                <TextField
                  placeholder="Descrição"
                  fullWidth
                  inputRef={register}
                  name="descricao"
                  error={!!errors.descricao}
                  helperText={errors.descricao?.message}
                />
                <div>
                  <Button variant="contained" size="small" component="span" onClick={() => setOpenModal(true)}>
                    Categorias
                    <Add />
                  </Button>
                </div>
                <div>
                  {!!errors.categorias && <LabelError>{errors.categorias[0]?.id?.message}</LabelError>}
                  {categorias &&
                    categorias.map((categoria, i) => (
                      <Chip key={`${categoria.id}`} label={categoria.nome} onDelete={() => removeCategoria(i)} />
                    ))}
                </div>
              </FormWrapper>
            </Grid>
            <Grid item xs={12}>
              <WrapperButtons>
                <Button startIcon={<Done />} variant="contained" type="submit">
                  Salvar Produto
                </Button>
                <Button startIcon={<ArrowBackIos />} variant="contained" onClick={() => history.goBack()}>
                  Voltar
                </Button>
              </WrapperButtons>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
        <WrapperContentModal>
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
                        variant="contained"
                        onClick={() => {
                          addCategoria(item);

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
        </WrapperContentModal>
      </StyledModal>
      <Backdrop open={isLoading} style={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default index;
