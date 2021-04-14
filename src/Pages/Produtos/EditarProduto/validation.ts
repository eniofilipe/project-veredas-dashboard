import * as yup from 'yup';

const ImagemShape = yup.object({
  url: yup.string(),
  path: yup.string(),
  id: yup.number(),
});

const CategoriaShape = yup
  .object({
    id: yup.number().required('Selecione alguma categoria'),
    nome: yup.string(),
    isvalid: yup.boolean(),
  })
  .required('Selecione alguma categoria');

export const ProductValidation = yup.object({
  nome: yup.string().required('Por favor, insira um nome para o produto!'),
  descricao: yup.string().required('Por favor, insira uma descricao para o produto!'),
  categorias: yup
    .array()
    .of(CategoriaShape)
    .min(1, 'Selecione ao menos 1 categoria')
    .required('Selecione alguma categoria'),
  imagem: ImagemShape,
});
