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
<div class="card-bg" >
${input} 

<div>
    <svg class="active" width="800px" height="800px" opacity="0.9"   fill="#fff" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
    <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg class="inactive width="800px" height="800px" opacity="0.5" fill="#fff"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
</svg>

<span>${atividade.nome}</span>

</div>

<time class= "short">
${formatar.dia.semana.curto}.
${formatar.dia.numerico} <br>
${formatar.hora}
</time>

<time class = "full">
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
