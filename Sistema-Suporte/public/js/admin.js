let isAdmin = false;

// Login
async function login(email, senha) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.mensagem);
      isAdmin = data.admin;
      carregarTickets();
    } else {
      alert('Falha no login: email ou senha inválidos.');
    }
  } catch (error) {
    alert('Erro na comunicação com o servidor.');
    console.error('Erro no login:', error);
  }
}

// Verificar login ao carregar a página
async function checkLogin() {
  try {
    const response = await fetch('/api/check-login', {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      isAdmin = data.usuario.admin;
      carregarTickets();
    } else {
      isAdmin = false;
      document.getElementById('tickets').innerHTML = 'Você precisa estar logado para ver os tickets.';
    }
  } catch (error) {
    console.error('Erro ao verificar login:', error);
  }
}

// Carregar os tickets
async function carregarTickets() {
  try {
    if (!isAdmin) {
      document.getElementById('tickets').innerHTML = 'Acesso negado! somente administradores podem ver os tickets.';
      return;
    }

    const response = await fetch('/api/tickets', {
      credentials: 'include'
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert('Você precisa estar logado para acessar essa área.');
      } else if (response.status === 403) {
        alert('Acesso negado: somente administradores.');
      } else {
        alert('Erro ao carregar tickets: ' + response.status);
      }
      return;
    }

    const tickets = await response.json();
    console.log('Tickets:', tickets);

    const container = document.getElementById('tickets');
    container.innerHTML = '';

    if (!Array.isArray(tickets) || tickets.length === 0) {
      container.innerText = 'Nenhum ticket encontrado.';
      return;
    }

    tickets.forEach(ticket => {
      const card = document.createElement('div');
      card.className = 'ticket-card';

      const dataFormatada = new Date(ticket.data).toLocaleString();

      card.innerHTML = `
        <h3>${ticket.assunto}</h3>
        <p><strong>Usuário:</strong> ${ticket.usuario}</p>
        <p>${ticket.mensagem}</p>
        <p><small>Criado em: ${dataFormatada}</small></p>
        <button onclick="removerTicket('${ticket.id}')">Remover</button>
      `;

      container.appendChild(card);
    });


  } catch (error) {
    console.error('Erro inesperado ao carregar tickets:', error);
    alert('Erro inesperado ao carregar tickets.');
  }
}

// Remover um ticket
async function removerTicket(id) {
  if (!confirm('Deseja realmente remover?')) return;

  try {
    const response = await fetch(`/api/tickets/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      alert('Ticket removido!');
      carregarTickets();
    } else if (response.status === 401) {
      alert('Você precisa estar logado para remover tickets.');
    } else if (response.status === 403) {
      alert('Acesso negado: somente administradores podem remover tickets.');
    } else {
      alert('Erro ao remover ticket.');
    }
  } catch (error) {
    alert('Erro inesperado ao remover ticket.');
    console.error('Erro:', error);
  }
}

async function logout() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      alert('Logout realizado com sucesso!');
      isAdmin = false;
      document.getElementById('tickets').innerHTML = '';
    } else {
      alert('Erro ao fazer logout.');
    }
  } catch (error) {
    alert('Erro inesperado ao fazer logout.');
    console.error('Erro:', error);
  }
}

window.onload = () => {
  checkLogin();
};
