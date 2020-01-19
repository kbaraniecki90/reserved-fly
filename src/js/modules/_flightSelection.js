import moveBox from './_moveBox'
import appReservedFly from './_appReservedFly'
export default function () {
    // Wydrukowanie lotów
    let activeflights = []
    let BoxActiveFlights = document.getElementById('flightContainers')

    fetch('./src/data/active-flights.json')
        .then(response => response.json())
        .then(json => {
            json.forEach(flight => {
                activeflights.push(flight)
                BoxActiveFlights.innerHTML += `<div class="box-flight col-3" id="${flight.name}">
                    <div class="box-flight__body">
                        <h3 class="h2">${flight['outlet-city']} <span class="material-icons">redo</span> ${flight['arrival-city']}</h3>
                        <p><span class="material-icons">flight_takeoff</span>Outlet:  ${flight['outlet-time']}</p>
                        <p><span class="material-icons">flight_land</span>Arrival: ${flight['arrival-time']}</p>
                    </div>
                </div>`
            });
        })
        .catch(error => console.log("ERROR: ", error));

    setTimeout(() => {
            window.boxs = document.querySelectorAll('.box-flight')
            boxs.forEach(e => {
                e.addEventListener('click', function() {
                    createViewFlight(this.id)
                    setTimeout(() => {
                        appReservedFly(this.id)
                        moveBox()
                    }, 200);

                    switchSection('flightContainers', 'viewAirplaneReservation')
                })
            });
    }, 200);

    // Tworzenie widoku dla wybranego lotu
    function createViewFlight(getflight) {
        activeflights.forEach(el => {
            if(el.name === getflight){
                document.getElementById('selectedFlight').innerHTML = `
                <div class="p-relative col">
                    <picture class="h-100 d-flex align-items-center justify-content-center w-100" id="planAirplane">
                        <img src="images/${el['type-plane']}.jpg" id="imgAirplane" alt="${el['type-plane']}">
                        <svg id="mapAirplane"></svg>
                    </picture>
                    <div class="d-flex align-items-center move move--left material-icons" data-moveTarget="planAirplane" data-moveDirection="left">chevron_left</div>
                    <div class="d-flex align-items-center move move--right material-icons" data-moveTarget="planAirplane" data-moveDirection="right">chevron_left</div>
                </div>
                <aside class="col-3"  id="bookingCost">
                    <div class="bookingCost__content">
                        <header class="text-center">
                            <h2 class="h1">Flight number: ${el.name}</h1>
                            <h3 class="h2">${el['outlet-city']} <span class="material-icons">redo</span> ${el['arrival-city']}</h2>
                            <p>Flight time: ${el['flight-time']}</p>
                            <p><span class="material-icons">flight_takeoff</span>Outlet: ${el['outlet-time']}<br>
                            <span class="material-icons">flight_land</span>Arrival: ${el['arrival-time']}</p>
                        </header>
                        <hr>
                        <form id="mainFormSummary" action="" method="get" class="">
                            <div class="form-head">
                                <h2>Selected places:</h2>
                            </div>
                            <div class="form-body">
                            </div>

                            <div class="form-footer">
                                <p>Sum: <strong><span id="sum">0</span> EUR</strong></p>
                            </div>
                        </form>
                        <!-- <div class="text-right">
                            <input type="submit"  value="Book a flight">
                        </div> -->
                    </div>
                </aside>
                `
            }
        })
    }

    // Przełączenie widoku
    const backSection = document.getElementById('backSection')
    backSection.addEventListener('click', function() {
        switchSection('viewAirplaneReservation', 'flightContainers')
    })
}