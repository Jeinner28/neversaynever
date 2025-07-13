//NAVBAR 
const menu = document.querySelector('#mobile_menu')
const menuLinks = document.querySelector('.navbar-menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

 // Datos de ejemplo
  const topPersonas = [
    { nombre: "Ronaldo Crespo", tickets: 22 },
    { nombre: "Josmel Escobar", tickets: 20 },
    { nombre: "Dairi Rodriguez", tickets: 8 }
  ];

  const tbody = document.querySelector('#topTicketsTable tbody');

  // Generar las filas de la tabla
  topPersonas.forEach((persona, index) => {
    const row = document.createElement('tr');

    const posCell = document.createElement('td');
    posCell.textContent = index + 1;
    row.appendChild(posCell);

    const nombreCell = document.createElement('td');
    nombreCell.textContent = persona.nombre;
    row.appendChild(nombreCell);

    const ticketsCell = document.createElement('td');
    ticketsCell.textContent = persona.tickets;
    row.appendChild(ticketsCell);

    tbody.appendChild(row);
  });