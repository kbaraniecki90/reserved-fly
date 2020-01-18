export default function () {
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
            animateMove = setInterval(
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

}