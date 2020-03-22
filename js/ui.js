class UI {

    constructor() {
        this.init();
    }

    init() {
        this.construirSelectCriptoMonedas();
    }

    // obtiene las criptomonedas que brinda la API para los options del select
    construirSelectCriptoMonedas() {
        api.obtenerMonedasAPI()
            .then(monedas => {
                const select = document.querySelector('#criptomoneda');
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    // en caso de error en la consulta a la API muestro un mensaje
    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        this.mostrarOcultarSpinner('block');
        setTimeout(() => {
            this.mostrarOcultarSpinner('none');
            document.querySelector('.mensajes').appendChild(div);
            setTimeout(() => {
                document.querySelector('.mensajes div').remove();
            }, 3000);
        }, 3000);

    }


    mostrarResultado(resultado, monedaSelect, cryptoSelect) {
        const datosMoneda = resultado[cryptoSelect][monedaSelect]; // accedo al objeto segun la moneda y cripto seleccionada
        const ultimaActualizacion = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-AR');
        let precio = datosMoneda.PRICE.toFixed(2);
        let variacion = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light>
                    <h2 class="card-title>Resultado</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de : ${precio}</p>
                    <p>La variacion de las ultimas 24hs: ${variacion}%</p>
                    <p>La ultima actualización fue realizada en: ${ultimaActualizacion}</p>
                </div>
            </div>
        `;
        this.mostrarOcultarSpinner('block');
        setTimeout(() => {
            this.mostrarOcultarSpinner('none');
            document.querySelector('#resultado').innerHTML = templateHTML;
        }, 3000);
    }

    mostrarOcultarSpinner(valorDisplay) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = valorDisplay;
    }

    // limpia el DOM caso de existir una consulta anterior
    borrarResultadoAnterior() {
        const resultadoAnterior = document.querySelector('#resultado > div');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }
    }

}