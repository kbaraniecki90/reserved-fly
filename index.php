<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./dist/css/main.css">
</head>
<body>
    <header id="header">
    <h1 class="text-uppercase"><span class="logo material-icons">flight</span>Book a flight - Boeing 737</h1>
    </header>
    <main class="container-fluid">
        <div class="row">
            <div class="p-relative col">
                <picture class="h-100" id="planAirplane">
                    <img src="images/Boeing_737-map.jpg" id="imgAirplane" alt="Map Boeing 737">
                    <svg id="mapAirplane"></svg>
                </picture>
                <div class="move move--left material-icons" data-moveTarget="planAirplane" data-moveDirection="left">chevron_left</div>
                <div class="move move--right material-icons" data-moveTarget="planAirplane" data-moveDirection="right">chevron_left</div>
            </div>
            <aside class="col-3" id="bookingCost">
                <div class="bookingCost__content">
                    <header class="text-center">
                        <h2 class="h1">Flight number: KB1903</h1>
                        <h3 class="h2">MX <span class="material-icons">redo</span> NZ</h2>
                        <p>Flight time: 14h 32min</p>
                        <p><span class="material-icons">flight_takeoff</span>Outlet:  20.12.2019 20:30<br>
                            <span class="material-icons">flight_land</span>Arrival: 21.12.2019 11:02</p>
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
                    <div class="text-right">
                        <input type="submit" value="Book a flight">
                    </div>

                </div>
            </aside>
        </div>
    </main>
    <footer id="footer">
        <h3 class="h1">Project author - Krzysztof Baraniecki</h3>
    </footer>
    <aside id="login">
        <div class="coverSitpage"></div>
        <div id="formLogin">
            <h3 class="h1"><span class="logo material-icons">flight</span>Book a flight</h3>
            <div class="messageError"></div>
            <form>
                <p>
                    <label>Email</label><br>
                    <input type="email" name="email" required>
                </p>
                <p>
                    <label>Password</label><br>
                    <input type="password" name="password" required>
                </p>
                <p>
                    <button>Login</button>
                </p>
            </form>
        </div>
    </aside>
    <script src="./dist/js/main.min.js"></script>
</body>
</html>