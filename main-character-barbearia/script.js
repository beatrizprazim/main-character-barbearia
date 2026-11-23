/* Demonstração acadêmica: credenciais e sessão no navegador, sem autenticação de servidor. */
(function () {
  const onHome = location.pathname.toLowerCase().endsWith('/home.html');
  const loggedIn = sessionStorage.getItem('mc_logged_in') === 'true';
  if (onHome && !loggedIn) { location.replace('index.html'); return; }
  if (!onHome && loggedIn) { location.replace('home.html'); return; }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const error = document.getElementById('loginError');
      if (!username || !password) { error.textContent = 'Preencha o usuário e a senha.'; return; }
      if (username !== 'cliente' || password !== '123456') { error.textContent = 'Usuário ou senha incorretos.'; return; }
      error.textContent = '';
      sessionStorage.setItem('mc_logged_in', 'true');
      location.href = 'home.html';
    });
    document.getElementById('togglePassword').addEventListener('click', function () {
      const input = document.getElementById('password');
      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';
      this.textContent = visible ? 'Ocultar' : 'Mostrar';
      this.setAttribute('aria-label', visible ? 'Ocultar senha' : 'Mostrar senha');
    });
  }

  const logout = document.getElementById('logoutBtn');
  if (logout) logout.addEventListener('click', function () {
    sessionStorage.removeItem('mc_logged_in');
    location.replace('index.html');
  });

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }
  const booking = document.getElementById('bookingForm');
  if (booking) booking.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('bookingDate').value;
    const message = document.getElementById('bookingMessage');
    if (!name || !service || !date) { message.textContent = 'Preencha todos os campos.'; return; }
    if (date < dateInput.min) { message.textContent = 'Escolha uma data válida.'; return; }
    const [year, month, day] = date.split('-');
    message.textContent = `Solicitação demonstrativa registrada para ${name}: ${service}, ${day}/${month}/${year}. Nenhuma reserva real foi criada.`;
    booking.reset();
  });
})();
