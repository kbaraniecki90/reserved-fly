export default function () {
    const login = document.getElementById('login'),
        btnLogin = login.querySelector('button'),
        inputsLogin = login.querySelectorAll('input')
    let loginData = {};

    blockWindow()

    // Sprawdzenie poprawności logowania
    btnLogin.addEventListener("click", function (e) {
        e.preventDefault()
        let flagValid = false;
        errors.length = 0

        inputsLogin.forEach(function (e){
            if(isEmpty(e)){
                flagValid = true
                if(flagValid){
                    (isLength(e, 5)) ?
                    flagValid = true :
                    getError("Field " + e.name + " too short")
                    if(e.type === 'email'){
                        (isEmail(e)) ?
                        flagValid = true :
                        getError("Bad email format")
                    }
                    loginData[e.name] = e.value
                }
            } else {
                getError("Field " + e.name + " it's empty")
            }
        })
        if(flagValid && !(errors.length > 0)){

            // udało sie formularz jest prawidłowy sprawdz dane
            searchUser(loginData.email, loginData.password)

            setTimeout(() => {
                if(window.logged){
                    displayErrors(errors)
                    document.querySelector('#login input[type="password"').value = ''
                    login.classList.add('d-none')
                    hellouser(logged.firstName, logged.lastName)
                    rmBlockWindow();
                    timeAutoLogout()
                }
                else{
                    getError("Wrong data")
                    displayErrors(errors)
                }
            }, 300);

        } else {
            displayErrors(errors)
        }
    })

    //Sprawdzanie, czy jest user
    function searchUser(email, password) {
        if(!window.logged){
            window.logged = false;
        }
        fetch('./src/data/users.json')
        .then(response => response.json())
        .then(json => {
            json.forEach(user => {
                if((user.email === email.toLowerCase()) && (user.password === password)){

                    // User istnieje z hasłem. Zapisanie danych
                    logged = {
                        "user": user.user,
                        "email": user.email,
                        "firstName": user.firstName,
                        "lastName": user.lastName
                    }
                    return logged;
                }
            });
            return logged
        })
        .catch(error => console.log("ERROR: ", error));
    }

    // Natychmiastowe wylogowanie
    document.getElementById('btnLogout').addEventListener("click", logout);

    // Wylogowanie
    function logout() {
        logged = false;
        session = false;
        blockWindow()
        login.classList.remove('d-none')
    }

    // Automatyczne wylogowanie
    window.timeLogin = null
    let session = false;
    const infoLogout = document.getElementById('infoLogout')
    const infoTimeLogout = document.getElementById('infoTimeLogout')

    function timeAutoLogout() {
        let timeSession = 30 * 3;
        session = true
        clearInterval(timeLogin);

        if(timeSession > 30){
            infoLogout.classList.add('d-none')
            rmBlockWindow()
        }

        timeLogin = setInterval(function() {
            timeSession--;
            infoTimeLogout.innerHTML = timeSession;
            if(timeSession <= 0){
                clearInterval(timeLogin);
                infoLogout.classList.add('d-none')
                logout()
            }
        // Utworzenie ostrzeżenia przed wylogowaniem
            if(timeSession === 30){
                blockWindow()
                infoLogout.classList.remove('d-none')
            }
        }, 1000);
    }

    // Odświeżenie czasu - automatycznego wylogowania
    document.addEventListener("click",
        function () {
            if(session){
                timeAutoLogout()
            }
        }
    );

}

/// Sprawdzanie parametrów
var errors = []
var messageError = document.querySelector('.messageError')

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

// Wypisanie błędów
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
    messageError.appendChild(ul)
}

// Powitanie użytkownika
function hellouser(firstName, lastName) {
    document.getElementById('account-user').innerHTML = `${firstName} ${lastName}`
}