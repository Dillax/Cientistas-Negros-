document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Revelar elementos ao rolar a página ---------- */
  var alvos = document.querySelectorAll('.reveal');
  if (alvos.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    alvos.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      observador.observe(el);
    });
  }

  /* ---------- Formulário de contato via Formspree ---------- */
  var form = document.getElementById('form-contato');
  var msg = document.getElementById('form-msg');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var dados = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: dados,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (resposta) {
        if (resposta.ok) {
          msg.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
          msg.classList.add('mostrar');
          form.reset();
        } else {
          msg.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
          msg.classList.add('mostrar');
        }
      })
      .catch(function () {
        msg.textContent = 'Não foi possível enviar agora. Verifique sua conexão e tente de novo.';
        msg.classList.add('mostrar');
      });
  });
});
