import login from './modules/_login'
import flightSelection from './modules/_flightSelection'
import effectPlaceholder from './modules/_effectPlaceholder'

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

window.blockWindow = function () {
    document.querySelector('body').classList.add('modal-open', 'modal-blur')
}

window.rmBlockWindow = function () {
    document.querySelector('body').classList.remove('modal-open', 'modal-blur')
}

window.switchSection = function (present, next) {
    document.getElementById(present).classList.toggle('d-none')
    document.getElementById(next).classList.toggle('d-none')
}

document.addEventListener('DOMContentLoaded', function () {
    // ### Run modules ###
    login()
    effectPlaceholder()
    blockWindow()
    flightSelection()
})