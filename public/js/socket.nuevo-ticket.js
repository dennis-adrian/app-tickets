//comando para establecer la conexion 
var socket = io();

//en jquery, si se va usar algun elemento del html constantemente, se haga una referencia del mismo
var label = $('#lblNuevoTicket');
//con este codigo, le decimos a jquery que busque en el DOM segun el id "lblNuevoTicket

socket.on('connect', function() {
    //codigo a ejecutar cuando haya conexión 
    console.log('Conectado al servidor');
});
socket.on('disconnect', function() {
    //codigo a ejecutar cuando haya conexión 
    console.log('Servidor desconectado');
});

//se ejecuta al cargar el navegador 
socket.on('estadoActual', function(data) {
    label.text(data.actual);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(ticket) {
        //asignar a la variable label el valor de ticket
        label.text(ticket);
        console.log(ticket);
    });
})