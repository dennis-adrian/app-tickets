//comando para establecer conexión
var socket = io();

//obtener parametros por el URL
var searchParams = new URLSearchParams(window.location.search);

//searchParams.has('escritorio') lo usamos para verificar si en el URL viene la palabra escritorio
if (!searchParams.has('escritorio')) {
    //si no viene escritorio en el URL, cambiamos la pagina a index.html
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
};

//si viene el escritorio obtenemos el valor de escritorio
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(ticket) {

        if (ticket === 'No hay tickets') {
            label.text(ticket);
            alert(ticket);
            return;
        }
        label.text('Ticket ' + ticket.numero)
    });
});