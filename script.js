// Função para enviar mensagem no chat
function enviarMensagem() {
    const input = document.getElementById('mensagemInput');
    const texto = input.value.trim();
    if (texto !== '') {
      const chatBox = document.getElementById('chatBox');
  
      const msgUsuario = document.createElement('div');
      msgUsuario.className = 'mensagem usuario';
      msgUsuario.textContent = texto;
      chatBox.appendChild(msgUsuario);
  
      const msgAtendente = document.createElement('div');
      msgAtendente.className = 'mensagem atendente';
      msgAtendente.textContent = 'Recebido! Vamos verificar isso.';
      setTimeout(() => {
        chatBox.appendChild(msgAtendente);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 500);
  
      input.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  
  // Função para agendar um novo compromisso
  function agendar() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const servico = document.getElementById('servico').value;
    const observacao = document.getElementById('observacao').value.trim();
  
    if (!nome || !email || !data || !hora || !servico) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
  
    const agendamento = { nome, email, data, hora, servico, observacao };
  
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  
    const confirmacao = document.getElementById('confirmacao');
    confirmacao.textContent = `Agendamento realizado com sucesso para ${nome} em ${data} às ${hora} para ${servico}.`;
  
    document.getElementById('formAgendamento').reset();
    return false;
  }
  
  // Função para consultar agendamentos pelo nome
  function consultarAgendamentos() {
    const nomeConsulta = document.getElementById('nomeConsulta').value.trim().toLowerCase();
    const resultadoDiv = document.getElementById('resultadoConsulta');
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  
    if (!nomeConsulta) {
      resultadoDiv.innerHTML = "<p style='color: red;'>Digite um nome para consultar.</p>";
      return;
    }
  
    const filtrados = agendamentos.filter(ag =>
      ag.nome.toLowerCase().includes(nomeConsulta)
    );
  
    if (filtrados.length === 0) {
      resultadoDiv.innerHTML = `<p>Nenhum agendamento encontrado para <strong>${nomeConsulta}</strong>.</p>`;
      return;
    }
  
    let html = `<p>Agendamentos encontrados para <strong>${nomeConsulta}</strong>:</p><ul>`;
    filtrados.forEach((ag) => {
      html += `<li>
        <strong>${ag.nome}</strong> - ${ag.servico} em ${ag.data} às ${ag.hora} (${ag.email})` +
        (ag.observacao ? ` — <em>${ag.observacao}</em>` : '') +
        `<br>
        <button onclick="editarAgendamento('${ag.nome}', '${ag.data}', '${ag.hora}')">Editar</button>
        <button onclick="cancelarAgendamento('${ag.nome}', '${ag.data}', '${ag.hora}')">Cancelar</button>
      </li>`;
    });
    html += '</ul>';
  
    resultadoDiv.innerHTML = html;
  }
  
  // Função para cancelar um agendamento
  function cancelarAgendamento(nome, data, hora) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const novos = agendamentos.filter(ag => !(ag.nome === nome && ag.data === data && ag.hora === hora));
    localStorage.setItem('agendamentos', JSON.stringify(novos));
    alert('Agendamento cancelado com sucesso!');
    consultarAgendamentos();
  }
  
  // Função para editar um agendamento existente
  function editarAgendamento(nome, data, hora) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const index = agendamentos.findIndex(ag => ag.nome === nome && ag.data === data && ag.hora === hora);
  
    if (index >= 0) {
      const ag = agendamentos[index];
  
      document.getElementById('nome').value = ag.nome;
      document.getElementById('email').value = ag.email;
      document.getElementById('data').value = ag.data;
      document.getElementById('hora').value = ag.hora;
      document.getElementById('servico').value = ag.servico;
      document.getElementById('observacao').value = ag.observacao || '';
  
      agendamentos.splice(index, 1);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  
      window.scrollTo(0, 0);
      alert('Edite os dados no formulário e clique em "Agendar" para salvar as alterações.');
    }
  }
  