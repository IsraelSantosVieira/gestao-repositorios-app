export default class MessageConstants
{
  static readonly ERROR = {
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
    },
    accountActivated: {
      summary: 'Ativação falhou',
      detail: 'Ocorreu um erro na ativação da sua conta, tente novamente.'
    },
    passwordRecovery: {
      summary: 'Recuperação Falhou',
      detail: 'Algo deu errado ao recuperar sua senha.'
    },
    passwordReset: {
      summary: 'Redefinição Falhou',
      detail: 'Algo deu errado na redefinição da sua senha.'
    }
  };

  static readonly WARNING = {
    unsavedChanges: {
      summary: 'Alterações Não Salvas',
      detail: 'Você tem alterações não salvas. Deseja sair sem salvar?'
    },
    sessionTimeout: {
      summary: 'Sessão Expirada',
      detail: 'Sua sessão expirou. Por favor, faça login novamente.'
    },
    resendCodeDelay: {
      summary: 'Aguarde um instante',
      detail: 'Espere antes de enviar uma nova requisição.'
    },
  };

  static readonly SUCCESS = {
    loginSuccess: {
      summary: 'Login bem-sucedido',
      detail: 'Você entrou com sucesso no sistema.'
    },
    accountCreated: {
      summary: 'Conta Criada',
      detail: 'Sua conta foi criada com sucesso!'
    },
    accountActivated: {
      summary: 'Conta Ativada',
      detail: 'Sua conta foi ativada com sucesso! Bem-vindo(a)!'
    },
    dataSaved: {
      summary: 'Dados Salvos',
      detail: 'As alterações foram salvas com sucesso.'
    },
    resendCode: {
      summary: 'Código enviado',
      detail: 'Um novo código foi enviado para o seu email.'
    },
    passwordRecovery: {
      summary: 'Recuperação solicitada',
      detail: 'Sua recuperação de senha foi solicitada com sucesso!'
    },
    passwordReset: {
      summary: 'Senha alterada',
      detail: 'Sua senha foi alterada com sucesso!'
    },
  };

  static readonly INFO = {
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
