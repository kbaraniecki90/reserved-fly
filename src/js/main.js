import test from './modules/test'

test()

var mapAirplane = document.getElementById('mapAirplane'),
    imgAirplane = document.getElementById('imgAirplane'),
    widthImgAirplane = imgAirplane.width,
    heightImgAirplane = imgAirplane.height,
    positions = []

function sizeMapAirplane() {
    mapAirplane.style.width = widthImgAirplane
    mapAirplane.style.height = heightImgAirplane
}
sizeMapAirplane()

fetch('./src/data/sites-boeing-737.json')
.then(function (res){
    return res.json();
})
.then(function (element){
    var lenght = element.length
    var index = 0
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

function getAllPositions() {
    var positions = document.querySelectorAll('rect')
    positions.forEach(e => {
        e.addEventListener("click", function () {
            if(e.classList.contains('position__available')){
                e.classList.toggle("active")
                addPositionForForm(e)
            }
        })
    });
}

function addPositionForForm(element) {
    var position = element.getAttribute("id")
    var dataPosition = getDataPosition(position)

    var formSummary = document.querySelector('#mainFormSummary .form-body')

    if(!(formSummary.querySelector('[data-getPosition="' + dataPosition.name + '"]'))){
        const newChoice = document.createElement("div")
        newChoice.classList.add("getSelect")
        newChoice.setAttribute("data-getPosition", dataPosition.name);
        newChoice.innerHTML = `
            <label for="groupOfPassengers-select" class="p">Position <strong>${dataPosition.name}</strong><br>
                Price: </label>
            <select name="groupOfPassengers" id="groupOfPassengers-select-${this.dataPosition.name}">
                <option data-price="${toNumbersPrice(dataPosition.price)}" value="adult">Adult ${toNumbersPrice(dataPosition.price)} EUR (100%)</option>
                <option data-price="${toNumbersPrice(discount(dataPosition.price, 0.8))}" value="pensioner">Pensioner ${toNumbersPrice(discount(dataPosition.price, 0.8))} EUR (80%)</option>
                <option data-price="${toNumbersPrice(discount(dataPosition.price, 0.6))}" value="student">Student ${toNumbersPrice(discount(dataPosition.price, 0.6))} EUR (60%)</option>
                <option data-price="${toNumbersPrice(discount(dataPosition.price, 0.2))}" value="child">Child ${toNumbersPrice(discount(dataPosition.price, 0.2))} EUR (20%)</option>
            </select>
            <div class="rm-element material-icons" onclick="removePositionInForm(\'${this.dataPosition.name}\')">clear</div>
        `;
        formSummary.appendChild(newChoice)
        sumPrice()
    } else {
        removePositionInForm(dataPosition.name)
    }
}

document.addEventListener('input', function (event) {
    if(event.target.id == "groupOfPassengers-select"){
        sumPrice()
    }
})

function removePositionInForm(element) {
    document.querySelector('[data-getPosition="' + element + '"]').remove()
    document.getElementById(element).classList.remove("active")
    sumPrice()
    return
}

function getDataPosition(position) {
    var element = false
    positions.forEach(e => {
        if(e.name == position){
            element = e
        }
    });
    return element
}

function sumPrice() {
    prices = document.querySelectorAll('#mainFormSummary option:checked')
    var sum = 0
    prices.forEach(price => {
    sum +=  Number(price.dataset.price)
    });
    document.getElementById("sum").innerText = numberWithSpaces(toNumbersPrice(sum))
}

// ### move box

var trafficDirections = document.querySelectorAll('.move[data-movetarget]')
var animateMove
var optionsMove = {
    "time": 45,
    "speed": 15
}

trafficDirections.forEach(e => {
    var moveDirection = e.dataset.movedirection

    e.addEventListener("mouseenter", function () {
        var moveTarget = document.getElementById(e.dataset.movetarget)
        window.animateMove = setInterval(
            function() {
                startAnimateMove(moveTarget, moveDirection)
            } 
        ,optionsMove.time)
    })

    e.addEventListener("mouseleave", function () {
        stopmAnimateMove(animateMove)
    })

});

function startAnimateMove(target, direction) {

    switch(direction) {
        case "left":
            target.scrollBy(-optionsMove.speed, 0)
        break; 
        case "right":
            target.scrollBy(optionsMove.speed, 0)
        break; 
        default:
            return false
    }
    
    if((target.scrollLeft == 0) || ((target.scrollLeft + target.offsetWidth) >= target.scrollWidth)){
        stopmAnimateMove(animateMove)
    }
    return true
}

function stopmAnimateMove(element) {
    clearTimeout(element)
}


// #### other 

function toNumbersPrice(price) {
    return Number((parseFloat(price).toFixed(2)))
}

function discount(price, discount) {
    return price * discount
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}