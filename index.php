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
    <h1 class="text-uppercase"><span class="logo material-icons">flight</span>Book a flight</h1>
    <div id="account"> <p>Hello, <span id="account-user"></span>. <a href="#!" id="btnLogout">logout out</a></p></div>
    </header>
    <main class="container-fluid">
        <div id="flightContainers" class="row">
            <div class="col-12">
                <h2 class="text-uppercase">Select flight</h2>
            </div>
        </div>
        <div id="viewAirplaneReservation" class="d-none">
            <div id="backSection"><i class="material-icons">arrow_back</i></div>
            <div class="row" id="selectedFlight">
            </div>
        </div>
    </main>
    <footer id="footer" class="d-flex flex-direction-column center justify-conte nt-center align-items-center">
        <h3 class="h1">Project author - Krzysztof Baraniecki</h3>
    </footer>
    <aside id="login"> 
        <div class="coverSitpage"></div>
        <div id="formLogin">
            <h3 class="h1 text-uppercase"><span class="logo material-icons">flight</span>Book a flight</h3>
            <div class="messageError"></div>
            <form class="d-flex flex-direction-column">
                <div class="input-effect">
                    <input data-effect-placeholder type="email" name="email" required class="effect-placeholder">
                    <label>Email</label>
                    <span class="focus-border"></span>
                </div>
                <div class="input-effect">
                    <input data-effect-placeholder type="password" name="password" autocomplete="on" required class="effect-placeholder">
                    <label>Password</label>
                    <span class="focus-border"></span>
                </div>
                <button class="btn btn-primary">Login</button>
            </form>
        </div>

        <div id="devInfo">
            <h4>Email and password:</h4>
            <ul>
                <li><strong>E: </strong>kowalski@gmail.com<strong> P: </strong>12345</li>
                <li><strong>E: </strong>kbaraniecki.wsb@gmail.com<strong> P: </strong>54321</li>
                <li><strong>E: </strong>natalia@gmail.com<strong> P: </strong>98765</li>
            </ul>
        </div>
    </aside>
    <div id="infoLogout" class="d-none">
        <h4>Warning</h4>
        <p>In <span id="infoTimeLogout">0</span>s. you will automatically log out.</p>
    </div>
    <script src="./dist/js/main.min.js"></script>
</body>
</html>

<!-- 

5.Podsumowanie zamówienia  

-->