export default function () {
    var body = document.querySelector('body')
    var login = document.getElementById('login')
    var btnLogin = login.querySelector('button')
    var inputsLogin = login.querySelectorAll('input')
    var errors = []
    var messageError = document.querySelector('messageError')

    body.classList.add('modal-open', 'modal-blur')

    btnLogin.addEventListener("click", function (e) {
        e.preventDefault()
        var flagValid = false;
        errors.length = 0

        
        inputsLogin.forEach(function (e){
            if(e.required){
                (isEmpty(e)) ? 
                    flagValid = true :
                    getError("Pole " + e.name + " jest pusty")
                if(flagValid){
                    (isLength(e, 5)) ?
                    flagValid = true :
                    getError("Pole " + e.name + " jest za krutkie")
                    if(e.type === 'email'){
                        (isEmail(e)) ?
                        flagValid = true :
                        getError("Zły formaty email")
                    }
                }
            }
        })
        console.log(errors)
        if(flagValid && !(errors.length > 0)){
            login.classList.add('d-none')
            body.classList.remove('modal-open', 'modal-blur')
        } else {
            displayErrors(errors)
        }
    })


    function isEmpty(field) {
        return field.value !== ""
    }

    function isLength(field, min) {
        return !(field.value.length < min);
    }

    function isEmail(field) {
        
        return field.value.indexOf("@") !== -1
    }

    function getError(comment) {
        errors.push(comment)
    }
    
    function  displayErrors(errors) {
        var ul = document.querySelector("ul.errors")

        if(!ul){
            ul = document.createElement("ul")
            
            ul.classList.add("errors")
        }
        ul.innerHTML = ""

        errors.forEach(error => {
            var li = document.createElement("li");

            li.textContent = error
            ul.appendChild(li)
        })
        messageError.parentNode.insertBefore(ul, messageError)
    }
}
