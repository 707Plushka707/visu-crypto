const binance = require('./controller/binance-interface.js')
const storage = require('./controller/json-storage.js')

window.addEventListener('DOMContentLoaded', () => {

    /* 
     * coin = sigla da moeda
     */
    const populatePanel = (coin) => {
        binance.websockets.prevDay(coin, (error, response) => {
            let priceEl = document.querySelector(`.${coin} .price`)
            let titleEl = document.querySelector(`.${coin} .title`)
            let perceEl = document.querySelector(`.${coin} .percentage`)

            priceEl.innerText = Math.round(response.averagePrice * 100) / 100  //Diminuir para 2 casas decimais 
            titleEl.innerText = response.symbol
            perceEl.innerText = response.percentChange

            changePercentageColor(response, perceEl)
        });
    }

    const changePercentageColor = (response, element) => {
        if (response.percentChange < 0)
            element.style.color = 'red';
        else
            element.style.color = 'green';
    }

    let getParams = global.location.search;

    if (getParams) {
        let newSymbol = getParams.split('=')[1]
        storage.addNewKey(newSymbol, { symbol: newSymbol })
    }


    storage.getAllKeys().forEach(element => {
        console.log(element)
    });


    /* const getAllCoins = () => {
        .forEach()
    }
 */
    /* binance.allOrders("BTCBRL", (error, orders, symbol) => {
       console.info(symbol+" orders:", orders);
    });
 */


    //populatePanel('BTCBRL')
    //populatePanel('ETHBRL')
})