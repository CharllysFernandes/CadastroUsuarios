function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cpf = cpf.padStart(11, '0'); // Completa com zeros à esquerda até ter 11 dígitos
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formata o CPF
    return cpf;
  }
