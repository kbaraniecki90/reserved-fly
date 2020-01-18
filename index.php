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
    <div id="account"> <p>Hello, <span id="account-user">Krzystof Baraniecki</span>. <a href="#!" id="btnLogout">logout out</a></p></div>
    </header>
    <main class="container-fluid">
        <div id="flightContainers" class="row">
            <div class="col-12">
                <h2>Wybór lotu</h2>
            </div>
        </div>
        <div id="viewAirplaneReservation" class="d-none">
            <div id="backSection"><i class="material-icons">arrow_back</i></div>
            <div class="row" id="selectedFlight">
            </div>
        </div>
    </main>
    <footer id="footer">
        <h3 class="h1">Project author - Krzysztof Baraniecki</h3>
    </footer>
    <!-- d-noen -->
    <aside id="login" class="d-none"> 
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

<!-- 
In progres
1. Logowaniem 

2. Wyborem daty/miejsca docelowego/liczby osób 

4. Wybór opcji dodatkowych (bagaż, taryfa) 

5.Podsumowanie zamówienia  

End
3. Wybór miejsca w samolocie 

-->