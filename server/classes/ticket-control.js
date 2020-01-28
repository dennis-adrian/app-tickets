///para poder grabar en el archivo data.json, necesitamos importar el fs
const fs = require('fs');


//clase para manejar los tickets pendientes
class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }
};

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //se puede leer un archivo json directamente en js usando un require

        //arreglo con todos los tickets que aún no han sido atendidos
        this.tickets = [];
        //ultimos 4 tickets en el arreglo de tickets pendientes, que representa a los tickets que apareceran en pantalla que todos estarán viendo
        this.ultimos4 = [];
        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    };

    siguienteTicket() {

        this.ultimo += 1;

        //al generar un nuevo ticket, tambien instanciamos un objeto de la clase ticket para guardarlo en la lista de tickets pendientes
        let ticket = new Ticket(this.ultimo, null);
        //agregamos el ticket al arreglo de pendientes
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    };

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    };
    getUltimos4() {
        return this.ultimos4;
    };

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //tomar el numero primer ticket pendiente
        let numeroTicket = this.tickets[0].numero;
        //eliminar el primer ticket del arreglo con la funcion shift()
        this.tickets.shift();

        //instanciamos un nuevo objeto de Ticket porque es el ticket que se va a atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //manda el ticket al inicio del arreglo, o sea que iria a la posicion 0 y no al final como suele hacerse
        this.ultimos4.unshift(atenderTicket);

        //en caso de que la cadena exceda los 4 elementos, se borra el ultimo
        if (this.ultimos4.length > 4) {
            //splice() elimina un elemento del arreglo, el primer argumento es la posicion y el segundo es cuantos elementos se van a borrar
            //si el primer argumento es negativo, empieza a contar desde el ulimo elemento
            //o sea, -1 = ultimo elemento
            this.ultimos4.splice(-1, 1)
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }
    reiniciarConteo() {

        this.ultimo = 0;

        //al reiniciar el conteo, tambien hay que reiniciar la cola de tickets pendientes
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');

        this.grabarArchivo();
    };

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            //al grabar datos en el archivo, tambíen hay que grabar el arreglo de tickets pendientes
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        //grabar en el archivo data.json
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    };
};

module.exports = {
    TicketControl
};