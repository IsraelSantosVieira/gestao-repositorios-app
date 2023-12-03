export default class MessageConstants {
  static readonly ERROR_MESSAGES = {
    loginFailed: {
      summary: 'Login Falhou',
      detail: 'Usuário ou senha incorretos.'
    },
    accountCreationFailed: {
      summary: 'Criação de Conta Falhou',
      detail: 'Não foi possível criar a conta. Verifique as informações fornecidas.'
    },
    invalidInput: {
      summary: 'Entrada Inválida',
      detail: 'Alguns campos estão inválidos ou em branco. Revise e tente novamente.'
    },
    networkError: {
      summary: 'Erro de Rede',
      detail: 'Falha na conexão com o servidor. Verifique sua conexão de internet.'
    },
    passwordIsWeak: {
      summary: 'Senha Fraca',
      detail: 'A senha não cumpre os requisitos de segurança.'
    },
    client: {
      summary: 'Erro no cliente',
      detail: 'Ocorreu um erro no cliente. Por favor, tente novamente.'
    }
  };

  static readonly WARNING_MESSAGES = {
    unsavedChanges: {
      summary: 'Alterações Não Salvas',
      detail: 'Você tem alterações não salvas. Deseja sair sem salvar?'
    },
    sessionTimeout: {
      summary: 'Sessão Expirada',
      detail: 'Sua sessão expirou. Por favor, faça login novamente.'
    },
  };

  static readonly SUCCESS_MESSAGES = {
    loginSuccess: {
      summary: 'Login Bem-sucedido',
      detail: 'Você entrou com sucesso no sistema.'
    },
    accountCreated: {
      summary: 'Conta Criada',
      detail: 'Sua conta foi criada com sucesso! Bem-vindo(a)!'
    },
    dataSaved: {
      summary: 'Dados Salvos',
      detail: 'As alterações foram salvas com sucesso.'
    },
  };

  static readonly INFO_MESSAGES = {
    passwordReset: {
      summary: 'Redefinição de Senha',
      detail: 'Um link para redefinição de senha foi enviado para seu e-mail.'
    },
    emailVerificationSent: {
      summary: 'Verificação de E-mail Enviada',
      detail: 'Um e-mail de verificação foi enviado. Verifique sua caixa de entrada.'
    },
  };
}
