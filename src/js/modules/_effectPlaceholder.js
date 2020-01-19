export default function () {    
    var animationInput = document.querySelectorAll('[data-effect-placeholder]')

    animationInput.forEach(el => {
        el.addEventListener('blur', function() {
            checkValueAnimationInput(el)
        })
        el.addEventListener('focus', function() {
            checkValueAnimationInput(el)
        })
        checkValueAnimationInput(el)
    })
}

function checkValueAnimationInput(input) {
    (input.value.length > 0) ? hasContent(input) : notHasContent(input)
}

function hasContent(elem) {
    elem.classList.add('has-content')
}

function notHasContent(elem) {
    elem.classList.remove('has-content')
}