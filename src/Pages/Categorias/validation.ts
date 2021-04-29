import * as yup from 'yup';

export const CategoriaValidation = yup.object({
  categoria: yup.string().required('Por favor, insira um nome para a categoria!'),
});
