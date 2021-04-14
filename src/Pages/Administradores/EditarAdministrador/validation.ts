import * as yup from 'yup';

export const AdministradorValidation = yup.object().shape({
  nomeAdm: yup.string().required('Por favor, insira um nome para o administrador!'),
  emailAdm: yup.string().email().required('Por favor, insira uma email!'),
  senhaAntiga: yup.string().required('Por favor, entre com a senha antiga!'),
  senhaAdm: yup.string().required('Por favor, insira uma senha'),
  repeatSenhaAdm: yup
    .string()
    .oneOf([yup.ref('senhaAdm'), undefined], 'Você digitou senhas diferentes nos campos de nova senha e repetir senha')
    .required('É necessário confirmar a nova senha'),
});
