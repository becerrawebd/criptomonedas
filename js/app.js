const api = new API('1bcbd3d4db7953987048625c2b499477153be6a1da42221939de10a6e6efdfab');
const ui = new UI();

// variables
const formulario = document.querySelector('#formulario');


//eventListeners
formulario.addEventListener('submit',(evt) => {
    evt.preventDefault();
    const moneda = document.querySelector('#moneda');
    const criptoMoneda = document.querySelector('#criptomoneda');
    const monedaSelect = moneda[moneda.selectedIndex].value;
    const criptoMonedaSelect = criptoMoneda[criptoMoneda.selectedIndex].value;
    ui.borrarResultadoAnterior();
    if(monedaSelect==='' || criptoMonedaSelect===''){
        ui.mostrarMensaje('Ambos campos son obligatorios','alert bg-danger text-center');
    }else{
        api.obtenerValores(monedaSelect,criptoMonedaSelect)
            .then(data => {
                ui.mostrarResultado(data.datos.RAW,monedaSelect,criptoMonedaSelect);
            })
            .catch(error => {
                ui.mostrarMensaje(`No hay datos de la criptomoneda ${criptoMonedaSelect}`,'alert bg-danger text-center')
            })
    }
})