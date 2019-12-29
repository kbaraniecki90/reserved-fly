import moveBox from './modules/moveBox'
import appReservedFly from './modules/appReservedFly'


document.addEventListener('DOMContentLoaded', function () {

    // ### Run modules ###
    moveBox()
    appReservedFly()

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