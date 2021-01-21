const binance = require('./controller/binance-interface.js')

window.addEventListener('DOMContentLoaded', () => {

    binance.websockets.prevDay('BTCBRL', (error, response) => {
        replaceText()
    });

    const replaceText = (text) => {
        let element = document.getElementsByClassName('.BTCBRL .price')
        if (element) element.innerText = 'text'
    }
})