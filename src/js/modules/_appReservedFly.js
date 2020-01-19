export default function (flight) {

    const mapAirplane = document.getElementById('mapAirplane'),
        imgAirplane = document.getElementById('imgAirplane'),
        widthImgAirplane = imgAirplane.width,
        heightImgAirplane = imgAirplane.height
    let positions = []

    //Wyliczanie wielkości dla miejsc w samolocie
    function sizeMapAirplane() {
        mapAirplane.setAttribute('width', `${widthImgAirplane}px`)
        mapAirplane.setAttribute('height', `${heightImgAirplane}px`)
    }
    sizeMapAirplane()
    //Pobieranie oraz utworzenie miejsc
    fetch('./src/data/sites-' + flight + '.json')
        .then(function (res){
        return res.json();
    })
    .then(function (element){
        const lenght = element.length
        let index = 0

        element.forEach(function (e){
            var rect = document.createElementNS( "http://www.w3.org/2000/svg", 'rect')
            rect.classList.add("position")
            rect.setAttribute("x", (e.location.x * widthImgAirplane))
            rect.setAttribute("y", (e.location.y * heightImgAirplane))
            rect.setAttribute("id", e.name);

            (e.status) ? rect.classList.add("position__reservation") : rect.classList.add("position__available") + positions.push(e)
            mapAirplane.appendChild(rect)

            if(++index == lenght){
                getAllPositions()
            }
        });
    })

    // Zaznaczenie pozycji + wprowadzenie do podsumowania
    function getAllPositions() {
    const positions = document.querySelectorAll('rect')
    positions.forEach(e => {
        e.addEventListener("click", function () {
            if(e.classList.contains('position__available')){
                e.classList.toggle("active")
                addPositionForForm(e)
            }
        })
    });
    }

    // Dodanie wybranego miejsca do wyników
    function addPositionForForm(element) {
        const position = element.getAttribute("id"),
            dataPosition = getDataPosition(position),
            formSummary = document.querySelector('#mainFormSummary .form-body')

        if(!(formSummary.querySelector('[data-getPosition="' + dataPosition.name + '"]'))){
            const newChoice = document.createElement("div")
            newChoice.classList.add("getSelect")
            newChoice.setAttribute("data-getPosition", dataPosition.name);
            newChoice.innerHTML = `
                <div class="rm-element material-icons" onclick="removePositionInForm(\'${dataPosition.name}\')">clear</div>
                <label for="groupOfPassengers-select" class="p">Position <strong>${dataPosition.name}</strong><br>
                Price: </label>
                <select name="groupOfPassengers" id="groupOfPassengers-select-${dataPosition.name}">
                    <option data-price="${toNumbersPrice(dataPosition.price)}" value="adult">Adult ${toNumbersPrice(dataPosition.price)} EUR (100%)</option>
                    <option data-price="${toNumbersPrice(discount(dataPosition.price, 0.8))}" value="pensioner">Pensioner ${toNumbersPrice(discount(dataPosition.price, 0.8))} EUR (80%)</option>
                    <option data-price="${toNumbersPrice(discount(dataPosition.price, 0.6))}" value="student">Student ${toNumbersPrice(discount(dataPosition.price, 0.6))} EUR (60%)</option>
                    <option data-price="${toNumbersPrice(discount(dataPosition.price, 0.2))}" value="child">Child ${toNumbersPrice(discount(dataPosition.price, 0.2))} EUR (20%)</option>
                </select>
                <p><input name="groupOfPassengersSuitcase" data-price="25" type="checkbox"> Add luggage (max 10 kg.) +25 EUR</p>
            `;
            formSummary.appendChild(newChoice)
            sumPrice()
        } else {
            removePositionInForm(dataPosition.name)
        }
    }

    // Śledzenie zmian w wyliczeniu
    document.addEventListener('input', function () {
        sumPrice()
    })

    // Usuniecie pozycji wybranej.
    window.removePositionInForm = function(element) {
        document.querySelector('[data-getPosition="' + element + '"]').remove()
        document.getElementById(element).classList.remove("active")
        sumPrice()
        return
    }

    function getDataPosition(position) {
        let element = false
        positions.forEach(e => {
            if(e.name == position){
                element = e
            }
        });
        return element
    }

    //podliczenie wartości
    function sumPrice() {
        const prices = document.querySelectorAll('#mainFormSummary option:checked, #mainFormSummary input[type="checkbox"]:checked')
        let sum = 0
        prices.forEach(price => {
            sum +=  Number(price.dataset.price)
        });
        document.getElementById("sum").innerText = numberWithSpaces(toNumbersPrice(sum))
    }
}