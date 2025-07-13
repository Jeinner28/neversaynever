
//NAVBAR 
const menu = document.querySelector('#mobile_menu')
const menuLinks = document.querySelector('.navbar-menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

  // RESTO DEL BODY
   window.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
      emailjs.init('ID PUBLICA');
    } else {
      console.error("EmailJS no se cargó correctamente.");
    }

    const totalTickets = 499;
    const ticketGrid = document.getElementById('ticketGrid');
    const showSelectionBtn = document.getElementById('showSelection');
    const ticketListDisplay = document.getElementById('ticketListDisplay');
    const ticketListInForm = document.getElementById('ticketListInForm');
    const selectedTicketsContainer = document.getElementById('selectedTicketsContainer');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const proceedBtn = document.getElementById('proceedBtn');
    const totalDiv = document.getElementById('total');
    const payMethodSelect = document.getElementById('payMethod');
    const bankDetails = document.getElementById('bankDetails');
    const bankInfo = document.getElementById('bankInfo');
    const paymentForm = document.getElementById('paymentForm');

    let selectedTickets = [];

    const ticketsVendidos = [
      254, 298, 57, 79, 297, 118, 411, 343, 478, 377,
      46, 142, 215, 20, 80, 281, 375, 415, 330, 13,
      399, 406, 264, 77, 257, 423, 429, 310, 15, 208,
      34, 19, 32, 283, 7, 6, 21, 31, 194, 11, 315, 238,
      184, 442, 317, 83, 304, 41, 192, 284, 448, 444,
      484, 17, 24, 149, 119, 313, 27, 348, 245, 87, 95,
      132, 250, 205, 120, 5, 333, 414, 148, 133, 22,
      23, 127, 10, 248

    ]; // Tickets ya adquiridos

for (let i = 0; i <= totalTickets; i++) {
  const ticket = document.createElement('div');
  ticket.className = 'ticket';
  ticket.innerText = i.toString().padStart(3, '0');
  ticket.dataset.number = i;

  // Si el ticket ya fue comprado, marcarlo y deshabilitarlo
  if (ticketsVendidos.includes(i)) {
    ticket.classList.add('sold');
    ticket.title = "Ticket ya vendido";
    // Opcional: bloquear clic para evitar selección
    ticket.style.cursor = 'not-allowed';
  } else {
    ticket.addEventListener('click', () => {
      const number = parseInt(ticket.dataset.number);
      if (selectedTickets.includes(number)) {
        selectedTickets = selectedTickets.filter(n => n !== number);
        ticket.classList.remove('selected');
      } else {
        selectedTickets.push(number);
        ticket.classList.add('selected');
      }
      showSelectionBtn.disabled = selectedTickets.length === 0;
    });
  }

  ticketGrid.appendChild(ticket);
}


    showSelectionBtn.addEventListener('click', () => {
      const ticketsFormatted = selectedTickets.map(n => n.toString().padStart(3, '0')).join(', ');
      ticketListDisplay.innerText = ticketsFormatted;
      ticketListInForm.innerText = ticketsFormatted;

      const usd = selectedTickets.length * 2;
      const ves = selectedTickets.length * 250;
      totalDiv.innerHTML = `Total: $${usd} USD / ${ves} Bs`;

      selectedTicketsContainer.classList.remove('hidden');
    });

    proceedBtn.addEventListener('click', () => {
      paymentFormContainer.classList.remove('hidden');
    });

    payMethodSelect.addEventListener('change', () => {
      const method = payMethodSelect.value;
      let info = '';
      if (!method) {
        bankDetails.classList.add('hidden');
        return;
      }
      switch (method) {
        case 'Pago Móvil':
          info = `Banco de Venezuela (0102)<br>0414 123 4567<br>V-11.055.128`; break;
        case 'Zelle':
          info = `Correo Zelle: Anicova805@gmail.com`; break;
        case 'Paypal':
          info = `Correo Paypal: paypal@example.com`; break;
        case 'Binance':
          info = `Wallet Binance: 1A2b3C4d5E6f7G8h9I0`; break;
      }
      bankInfo.innerHTML = info;
      bankDetails.classList.remove('hidden');
    });

    paymentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const payMethod = payMethodSelect.value;
      const paymentProof = document.getElementById('paymentProof').files[0];

      if (!paymentProof) {
        alert('Subí el comprobante de pago.');
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        const imageData = reader.result;

        const ticketsFormatted = selectedTickets.map(n => n.toString().padStart(3, '0')).join(', ');
        const usd = selectedTickets.length * 2;
        const ves = selectedTickets.length * 250;

        const templateParams = {
          to_email: 'eliandev.web@gmail.com',
          nombre: fullName,
          whatsapp: phone,
          correo: email,
          metodo_pago: payMethod,
          tickets: ticketsFormatted,
          total_usd: `$${usd}`,
          total_ves: `${ves} Bs`,
          datos_bancarios: bankInfo.innerHTML,
          //comprobante: imageData
        };

        emailjs.send('id servicio', 'id de plantillas', templateParams)
          .then(() => {
            alert('✅ ¡Correo enviado con comprobante!');
            paymentForm.reset();
            bankDetails.classList.add('hidden');
            paymentFormContainer.classList.add('hidden');
            selectedTicketsContainer.classList.add('hidden');
            selectedTickets = [];
            document.querySelectorAll('.ticket.selected').forEach(t => t.classList.remove('selected'));
          })
          .catch((error) => {
            console.error('❌ Error al enviar:', error);
            alert('Ocurrió un error al enviar el email.');
          });
      };

      reader.readAsDataURL(paymentProof);
    });
  });