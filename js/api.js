class API {

    constructor(apiKey){
        this.apiKey = apiKey;
    }

    async obtenerMonedasAPI(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;
        const respuesta = await fetch(url);
        const monedas = await respuesta.json();   
        return {
            monedas
        }
    }

    async obtenerValores(moneda,criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apiKey}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return {
            datos
        }
    }


}