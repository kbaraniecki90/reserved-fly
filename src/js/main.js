var mapAirplane = document.getElementById('mapAirplane'),
    imgAirplane = document.getElementById('imgAirplane'),
    widthImgAirplane = imgAirplane.width,
    heightImgAirplane = imgAirplane.height

function sizeMapAirplane() {
    mapAirplane.style.width = widthImgAirplane
    mapAirplane.style.height = heightImgAirplane
}
sizeMapAirplane()

fetch('./data/sites-boeing-737.json')
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
        rect.setAttribute("title", e.name);
        (e.status) ? rect.classList.add("position__reservation") : rect.classList.add("position__available")
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
            e.classList.toggle("active")
        })
    });
}

