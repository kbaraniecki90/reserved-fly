import moveBox from './modules/_moveBox'
import appReservedFly from './modules/_appReservedFly'
import login from './modules/_login'


document.addEventListener('DOMContentLoaded', function () {

    // ### Run modules ###
    moveBox()
    appReservedFly()
    login()

    // #### Micro functions ####
    window.toNumbersPrice = function (price) {
        return Number((parseFloat(price).toFixed(2)))
    }

    window.discount = function (price, discount) {
        return price * discount
    }

    window.numberWithSpaces = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

})