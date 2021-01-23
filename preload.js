const binance = require('./controller/binance-interface.js')
//const storage = require('./controller/json-storage.js')
const storage = require('electron-json-storage')


window.addEventListener('DOMContentLoaded', () => {

    /* 
     * coin = sigla da moeda
     */
    const populatePanel = (coin, index) => {
        binance.websockets.prevDay(coin, (error, response) => {
            let priceEl = document.querySelectorAll('.coin-panel .price')
            let titleEl = document.querySelectorAll('.coin-panel .title')
            let perceEl = document.querySelectorAll('.coin-panel .percentage')

            priceEl[index].innerText = Math.round(response.averagePrice * 100) / 100  //Diminuir para 2 casas decimais 
            titleEl[index].innerText = response.symbol
            perceEl[index].innerText = Math.round(response.percentChange * 100) / 100 + '%'

            if (response.percentChange < 0)
                perceEl[index].style.color = 'red';
            else
                perceEl[index].style.color = 'green';
        });
    }

    function checkPage() {
        return window.location.pathname
    }

    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
    
    if (checkPage().includes('index')) {
        console.log('index')

        storage.keys(function (error, keys) {
            if (error) throw error;

            keys.forEach(function (value, i) {
                console.log(value + i)
                populatePanel(value, i)
            })
        });
    }

    if (checkPage().includes('assets')) {
        console.log('assets')

        function updateCoinList(){
            document.querySelector('#tbs-body').innerHTML = ''

            storage.keys(function (error, keys) {
                if (error) throw error;
    
                keys.forEach(function (value, i) {
                    document.querySelector('#tbs-body').innerHTML += "<tr><td class='tbs-symbol'>" + value + "</td><td></td><td></td><td></td><td></td><td style='text-align:right; padding-right: 25px;' class='tbs-delete'><a href='?delete=" + value + "'>X</a></td></tr>"
                })
            });
        }
        
        updateCoinList();

        if(findGetParameter('delete')){
            deleteSymbol = findGetParameter('delete')
            storage.remove(deleteSymbol, function(error) {
                if (error) throw error;
              });
        }

        if (findGetParameter('symbol')) {
            newSymbol = findGetParameter('symbol')
            storage.set(newSymbol, { symbol: newSymbol }, function (error) {
                if (error) throw error;
                updateCoinList();
            });
        }

        

    }



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