const salarioHoraInput = document.getElementById("salario_hora");
const horasTrabalhadasInput = document.getElementById("horas_trabalhadas");
const salarioTotalInput = document.getElementById("salario_total");
const formulario = document.querySelector('form');
const nomeInput = document.getElementById("nome");
const tabelaDados = document.getElementById('tabela-dados');
const tbody = tabelaDados.getElementsByTagName('tbody')[0];
let dadosFuncionarios = [];

salarioHoraInput.addEventListener("input", calcularSalarioTotal);
horasTrabalhadasInput.addEventListener("input", calcularSalarioTotal);

function calcularSalarioTotal() {
    const salarioHora = salarioHoraInput.valueAsNumber || 0;
    const horasTrabalhadas = horasTrabalhadasInput.valueAsNumber || 0;

    const salarioTotal = salarioHora * horasTrabalhadas;

    salarioTotalInput.value = salarioTotal.toFixed(2);
}

// Selecione o input do telefone
const telefoneInput = document.querySelector('#telefone');

telefoneInput.addEventListener('input', function (event) {
    // Remova tudo que não for número
    const apenasNumeros = event.target.value.replace(/\D/g, '');

    // Formate o número de telefone com o padrão brasileiro
    let numeroFormatado;
    if (apenasNumeros.length === 11) {
        numeroFormatado = apenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (apenasNumeros.length === 10) {
        numeroFormatado = apenasNumeros.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
        numeroFormatado = apenasNumeros;
    }

    // Defina o valor do input como o número de telefone formatado
    event.target.value = numeroFormatado;
});

function salvarDados() {
    // cria um objeto com os dados do novo funcionário
    const novoFuncionario = {
        nome: nomeInput.value,
        telefone: telefoneInput.value,
        salarioHora: salarioHoraInput.valueAsNumber,
        horasTrabalhadas: horasTrabalhadasInput.valueAsNumber,
        salarioTotal: salarioTotalInput.valueAsNumber,
    };

    // recupera a string JSON dos dados dos funcionários do localStorage
    const dadosJSON = localStorage.getItem('dadosFuncionarios');

    // se já existem dados salvos, adiciona o novo funcionário à array de dados
    // senão, cria uma nova array com o novo funcionário
    const dadosFuncionarios = dadosJSON ? JSON.parse(dadosJSON) : [];
    dadosFuncionarios.push(novoFuncionario);

    // converte a array de dados em uma string JSON e salva no localStorage
    const dadosFuncionariosJSON = JSON.stringify(dadosFuncionarios);
    localStorage.setItem('dadosFuncionarios', dadosFuncionariosJSON);

    // exibe mensagem de sucesso e limpa os campos do formulário
    alert('Dados salvos localmente!');
    formulario.reset();
    mostrarDadosSalvos();
}

function carregarDados() {
    // recupera os dados salvos do localStorage
    const dadosJSON = localStorage.getItem('dadosFuncionarios');

    // verifica se existem dados salvos
    if (dadosJSON !== null) {
        // converte string JSON para objeto
        const dadosFuncionarios = JSON.parse(dadosJSON);

        // limpa o conteúdo atual da tabela
        tbody.innerHTML = '';

        // percorre a lista de funcionários e cria uma nova linha para cada um
        for (let i = 0; i < dadosFuncionarios.length; i++) {
            const novaLinha = document.createElement('tr');
            const funcionario = dadosFuncionarios[i];

            // adiciona as células da tabela com os dados do funcionário
            const nomeCelula = document.createElement('td');
            nomeCelula.textContent = funcionario.nome;
            novaLinha.appendChild(nomeCelula);

            const telefoneCelula = document.createElement('td');
            telefoneCelula.textContent = funcionario.telefone;
            novaLinha.appendChild(telefoneCelula);

            const salarioHoraCelula = document.createElement('td');
            salarioHoraCelula.textContent = funcionario.salarioHora;
            novaLinha.appendChild(salarioHoraCelula);

            const horasTrabalhadasCelula = document.createElement('td');
            horasTrabalhadasCelula.textContent = funcionario.horasTrabalhadas;
            novaLinha.appendChild(horasTrabalhadasCelula);

            const salarioTotalCelula = document.createElement('td');
            salarioTotalCelula.textContent = funcionario.salarioTotal;
            novaLinha.appendChild(salarioTotalCelula);

            // adiciona a nova linha na tabela
            tbody.appendChild(novaLinha);
        }
    }
}


formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // previne que o formulário seja enviado
    salvarDados();
    alert('Dados salvos localmente!');
});

function mostrarDadosSalvos() {
    const tabelaDados = document.getElementById('tabela-dados');
    const tbody = tabelaDados.getElementsByTagName('tbody')[0];

    // limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    // recupera os dados salvos do localStorage
    const dadosJSON = localStorage.getItem('dadosFuncionarios');
    const dadosFuncionarios = JSON.parse(dadosJSON);

    // itera sobre todos os funcionários salvos e cria uma nova linha na tabela para cada um
    for (let i = 0; i < dadosFuncionarios.length; i++) {
        const novaLinha = document.createElement('tr');
        const funcionario = dadosFuncionarios[i];

        // adiciona as células da tabela com os dados do funcionário
        const nomeCelula = document.createElement('td');
        nomeCelula.textContent = funcionario.nome;
        novaLinha.appendChild(nomeCelula);

        const telefoneCelula = document.createElement('td');
        telefoneCelula.textContent = funcionario.telefone;
        novaLinha.appendChild(telefoneCelula);

        const salarioHoraCelula = document.createElement('td');
        salarioHoraCelula.textContent = funcionario.salarioHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        salarioHoraCelula.style.textAlign = 'center';
        salarioHoraCelula.addEventListener('click', editarCelula);
        novaLinha.appendChild(salarioHoraCelula);

        const horasTrabalhadasCelula = document.createElement('td');
        horasTrabalhadasCelula.textContent = funcionario.horasTrabalhadas;
        horasTrabalhadasCelula.style.textAlign = 'center';
        horasTrabalhadasCelula.addEventListener('click', editarCelula);
        novaLinha.appendChild(horasTrabalhadasCelula);

        const salarioTotalCelula = document.createElement('td');
        salarioTotalCelula.textContent = funcionario.salarioTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        salarioTotalCelula.style.textAlign = 'center';
        salarioTotalCelula.addEventListener('click', editarCelula);
        novaLinha.appendChild(salarioTotalCelula);

        // adiciona a nova linha na tabela
        tbody.appendChild(novaLinha);
    }
}


function editarCelula(event) {
    console.log("editar celual")
    const celula = event.target;

    // Verifica se a célula clicada é editável
    if (celula.classList.contains('editavel')) {
        // Cria um campo de entrada (input) com o valor atual da célula
        const campoEdicao = document.createElement('input');
        campoEdicao.type = 'text';
        campoEdicao.value = celula.textContent.trim();
        celula.textContent = '';
        celula.appendChild(campoEdicao);

        // Adiciona um evento para salvar a edição quando a tecla Enter for pressionada
        campoEdicao.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const novoValor = campoEdicao.value.trim();
                celula.removeChild(campoEdicao);
                celula.textContent = novoValor;

                // Atualiza o objeto funcionário e salva no localStorage
                const linha = celula.parentNode;
                const indice = linha.rowIndex - 1;
                const dadosJSON = localStorage.getItem('dadosFuncionarios');
                const dadosFuncionarios = JSON.parse(dadosJSON);
                const funcionario = dadosFuncionarios[indice];
                if (celula.classList.contains('editavel-salario-hora')) {
                    funcionario.salarioHora = parseFloat(novoValor.replace(',', '.'));
                } else if (celula.classList.contains('editavel-horas-trabalhadas')) {
                    funcionario.horasTrabalhadas = parseFloat(novoValor.replace(',', '.'));
                }
                funcionario.salarioTotal = funcionario.salarioHora * funcionario.horasTrabalhadas;
                localStorage.setItem('dadosFuncionarios', JSON.stringify(dadosFuncionarios));
            }
        });
    }
}


// chama a função de mostrar os dados salvos ao carregar a página
mostrarDadosSalvos();
