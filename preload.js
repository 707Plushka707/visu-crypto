const binance = require('./controller/binance-interface.js')

window.addEventListener('DOMContentLoaded', () => {

  function getCoinPrice(coin) {
    binance.prices(coin, (error, ticker) => {
      replaceText(coin, Object.values(ticker)[0])
    })
  }

  const replaceText = (selector, text) => {
    let element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  getCoinPrice('BTCBRL')
  getCoinPrice('BTCUSDT')

  const reloadButton = document.getElementById('reload')
  reloadButton.addEventListener("click", () => {
    getCoinPrice('BTCBRL')
    getCoinPrice('BTCUSDT')
  })
})