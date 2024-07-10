//bibliotecas e códigos de terceiros UI
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      },
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm'),
  };
};

formatador(new Date('2024-04-01'));

//object {}
const atividade = {
  nome: 'Almoço',
  data: new Date('2024-07-08 10:00'),
  finalizada: true,
};

//lista, array, vetor[]
let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date('2024-07-09 12:00'),
    finalizada: false,
  },
  {
    nome: 'Gamming session',
    data: new Date('2024-07-09 16:00'),
    finalizada: true,
  },
];

//atividades = []

//arrow function
const criarItemAtividade = (atividade) => {
  let input = `
<input 
onchange = "concluirAtividade(event)"
value="${atividade.data}"
type="checkbox" 
`;

  if (atividade.finalizada) {
    input += 'checked';
    //input = input + 'checked'
  }

  input += '>';

  //alert(input)
  const formatar = formatador(atividade.data);

  return `
<div >
${input} 
<span>${atividade.nome}</span>
<time>
${formatar.dia.semana.longo}, 
dia ${formatar.dia.numerico} 
de ${formatar.mes} 
às ${formatar.hora}h</time>
</div> 
  `;
};

const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section');
  section.innerHTML = '';

  //verificar se a minha lista está vazia = =
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
    return;
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade);
  }
};

atualizarListaDeAtividades();

const salvarAtividade = (event) => {
  event.preventDefault();
  const dadosFormulario = new FormData(event.target);

  const nome = dadosFormulario.get('atividade');
  const dia = dadosFormulario.get('dia');
  const hora = dadosFormulario.get('hora');
  const data = `${dia} ${hora}`;

  const novaAtividade = {
    nome,
    data,
    finalizada: false,
  };

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data;
  });

  if (atividadeExiste) {
    return alert('Dia/Hora não disponível');
  }

  atividades = [novaAtividade, ...atividades];
  atualizarListaDeAtividades();

  //alert(nome)
};

const criarDiasSelecao = () => {
  const dias = [
    '2024-02-28',
    '2024-02-29',
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
  ];

  let diasSelecao = '';

  for (let dia of dias) {
    const format = formatador(dia);
    const diaFormatado = `
    ${format.dia.numerico} de
    ${format.mes}
    `;
    diasSelecao += `
    <option value="${dia}">${diaFormatado}</option>
    `;
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
};

criarDiasSelecao();

const criarHorasSelecao = () => {
  let horasDisponiveis = '';

  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0');
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`;
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`;
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis;
};
criarHorasSelecao();

const concluirAtividade = (event) => {
  const input = event.target;
  const dataDesteInput = input.value;

  const atividade = atividade.find((atividade) => {
    return atividade.data == dataDesteInput;
  });

  if (!atividade) {
    return;
  }

  atividade.finalizada = !atividade.finalizada;
};
