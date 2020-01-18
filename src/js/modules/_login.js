export default function () {
    var login = document.getElementById('login')
    var btnLogin = login.querySelector('button')
    var inputsLogin = login.querySelectorAll('input')
    var errors = []
    var messageError = document.querySelector('.messageError')
    var loginData = {};

    blockWindow()

    btnLogin.addEventListener("click", function (e) {
        e.preventDefault()
        var flagValid = false;
        errors.length = 0

        inputsLogin.forEach(function (e){
            if(e.required){ //<< mozemy sie tego pozbyc
                if(isEmpty(e)){
                    flagValid = true
                    if(flagValid){
                        (isLength(e, 5)) ?
                        flagValid = true :
                        getError("Pole " + e.name + " jest za krutkie")
                        if(e.type === 'email'){
                            (isEmail(e)) ?
                            flagValid = true :
                            getError("Zły formaty email")
                        }
                        loginData[e.name] = e.value
                    }
                } else {
                    getError("Pole " + e.name + " jest pusty")
                }
            }
        })
        if(flagValid && !(errors.length > 0)){

            // udało sie formularz jest prawidłowy sprawdz dane
            searchUser(loginData.email, loginData.password)

            setTimeout(() => {
                if(window.logged){
                    login.classList.add('d-none')
                    rmBlockWindow();
                    timeAutoLogout()
                }
                else{
                    getError("złe dane")
                    displayErrors(errors)
                }
            }, 100);

        } else {
            displayErrors(errors)
        }

    })

    ///#### sprawdazanie parametrow

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

    // wypisanie bledow

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


    //#### sprawdzanie czy jest user
    function searchUser(email, password) {
        if(!window.logged){
            window.logged = false;
        }
        fetch('./src/data/users.json')
        .then(response => response.json())
        .then(json => {
            json.forEach(user => {
                if((user.email === email) && (user.password === password)){

                    // user istnieje z haslem. Zapisanie danych
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



    document.getElementById('btnLogout').addEventListener("click", logout);

    // wylogowanie
    function logout() {
        logged = false;
        session = false;
        blockWindow()
        login.classList.remove('d-none')
    }

    // czas wyogowania automatycznego

    var session = false;
    window.timeLogin = null

    function timeAutoLogout() {
        var timeSession = 60 * 3;
        session = true
        clearInterval(timeLogin);

        timeLogin = setInterval(function() {
            timeSession--;
            if(timeSession <= 0){
                clearInterval(timeLogin);
                logout()
            }
        }, 1000);
    }

    document.addEventListener("click",
        function () {
            if(session){
                timeAutoLogout()
            }
        }
    );

}
