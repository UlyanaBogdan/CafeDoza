const Header = {
  render: () => {
    return `
        <div class="menu-header">
          <div class="div-menu">
            <img src="https://i.postimg.cc/6p97KrsH/coffeecup-114302.png" class="coffee-icon">
            <img src="https://i.postimg.cc/5NYcQKhH/Plus-Symbol-Vector-PNG-Picture-1-1.png" class="plus">
          </div>
          <div class="closed open-menu">
            <div class="navigation-block">
              <ul class="navigation">
                <li class="lng-aboutus">About us</li>
                <li><a href="#main" class="lng-main">Main</a></li>
              </ul>
              <ul class="navigation closed mybonuses">
                <li class="lng-you">You</li>
                <li><a href="#bonuses" class="lng-bonuses">My bonuses</a></li>
              </ul>
              <ul class="navigation">
                <li class="lng-wannatry">Wanna try?</li>
                <li><a href="#drinklist" class="lng-menu">Menu</a></li>
              </ul>
            </div>
            <button class="login-btn lng-login">Log in/Sign Up</button>
            <button class="closed logout-btn lng-logout">Log Out</button>
            <div class="line"></div>
            <p class="copyright">2023 &copy; CAFE DOZA, INC.</p>
          </div>
        </div>
        `;
  }
};

const ModalAuth = {
  render: () => {
    return `
        <div class="closed modal-overlay"></div>
        <div class="closed auth-modal" >
          <button type="button" class="close-auth"><img src="./img/plusAuth.svg" class="plus-auth-img"></button>
          <h3 class="first-time-text closed lng">Hi, first time here?</h3>
          <h3 class="hi-again-text lng">Hi again!</h3>
          <input type="text" class="name-input reg-part closed" placeholder="Name" autocomplete="on">
          <input type="email" class="email-input" placeholder="Email" autocomplete="on">
          <input type="password" class="input-password" placeholder="Password">
          <div class="error-auth"></div>
          <button type="button" class="reg-btn reg-part closed lng">sign up</button>
          <button type="button" class="log-btn log-part lng">sign in</button>
          <button type="button" class="have-acc reg-part closed lng">Already have an account?</button>
          <button type="button" class="new-here log-part lng">New here?</button>
        </div>
        <div class="successful-reg-modal closed">
          <h3 class="lng">Congratulations!<br>Successful registration!<br>♥</h3>
        </div>
        `
  }
}

const Main = {
  render: () => {
    return `
        <section class="main">
          <h2 class="wow animate__fadeIn animate__slow lng">Your personal coffee DOZA</h2>
          <img src="https://i.postimg.cc/C5RJW2Ty/image-2023-09-03-17-46-13.png" class="index-coffee">
          <p class="main-description lng">Here coffee is brewed in a huge variety from classic cappuccino and latte to Turkish coffee on the sand. All drinks are 100% fresh roasted arabica from Brazil, Colombia and Ethiopia. For dessert, you can choose treats of our own production.</p>
        </section>
        `
  }
}

const CoffeeShops = {
  render: () => {
    return `
        <section class="locations">
          <h2 class="lng">Our coffee-shops</h2>
          <div class="container-locations-slider">
            <div class="location wow animate__fadeInUp animate__slow">
              <div class="shop-name">
                <img src="./img/coffeshopicon.png">
                <p class="lng">Coffee-shop 1</p>
              </div>
              <img src="./img/coffeshop.jpg" class="shop-photo">
              <p class="shop-address lng">Radygiera, 11, Warsaw</p>
            </div>
            <div class="location wow animate__fadeInUp animate__slow">
              <div class="shop-name">
                <img src="./img/coffeshopicon.png">
                <p class="lng">Coffee-shop 2</p>
              </div>
              <img src="./img/coffeeshop3.jpg" class="shop-photo">
              <p class="shop-address lng">Radygiera, 11, Warsaw</p>
            </div>
            <div class="location wow animate__fadeInUp animate__slow">
              <div class="shop-name">
                <img src="./img/coffeshopicon.png">
                <p class="lng" Coffee-shop 3</p>
              </div>
              <img src="./img/coffeeshop2.jpg" class="shop-photo">
              <p class="shop-address lng">Radygiera, 11, Warsaw</p>
            </div>
          </div>
        </section>
        <section class="maps">
          <img src="./img/coffee-shop-location-icon.png" class="maps-icon">
          <div class="map wow animate__fadeInUp animate__slow">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A9f0a0f2d566cd4e4b735431bcfaa522e7d7250967e8d84bfa56412a459590ead&amp;source=constructor" width="700" height="470" frameborder="0"></iframe>
          </div>
        </section>
        `
  }
}


const Menu = {
  render: () => {
    return `
        <section class="menu-section">
          <h2 class="lng">Our menu</h2>
          <div class="search-menu-div">
            <input type="text" placeholder="Search" class="search-input">
            <button class="clear-search-btn"><img src="./img/plusAuth.svg"></button>
          </div>
          <div class="menu-container">
          </div>
        </section>
        `
  }
}

const ErrorModal = {
    render: () => {
        return `
        <div class="closed error-modal animate__animated animate__tada">
            <p class="error-text"></p>
        </div>
        `
    }
}

const Progress = {
  render: () => {
    return `
        <section class="my-cabinet">
            <div class="modal-coffee closed animate__animated animate__flipInX animate__slow">
                <p>♥</p>
                <img src="./img/cupmodal.svg" class="modalplus-img">
                <h3 class="lng">+1 cup!</h3>
            </div>
            <div class="modal-congratulations closed animate__animated animate__flipInX animate__slow">
                <p class="lng">Hooray!</p>
                <img src="./img/bonus_1.svg" class="modalplus-img">
                <h3 class="lng">bonus!</h3>
            </div>
            <div class="code-input-block">
                <input type="text" class="code-input" placeholder="your code">
                <button type="button" class="search-btn"><img src="../img/plusAuth.svg"></button>
            </div>
            <h2 class="bonuses-greeting animate__animated animate__pulse animate__slow lng">My Bonuses</h2>
            <button class="check-bonuses-btn lng">Check bonuses!</button>
            <div class="progress-bar"><span class="cup-progress"></span></div>
            <div class="have-bonuses animate__animated animate__pulse animate__slow animate__infinite">
                <img class="bonus-number-img" src="../img/gift.svg">
                <p class="bonus-number"></p>
            </div>
        </section>
        `
  }
}

const DrinkDiv = {
    render: (title, image) => {
        return `
        <div class="drink-container wow animate__zoomIn animate__slow">
            <h3 class="drink-title lng">${title}</h3>
            <img src="${image}" class="drink-img lng" alt="${title}">
        </div>
        `
    }
}


const GameComp = {
  render: () => {
    return `
        <section class="game">
          <h2 class="lng">Play the clicker!</h2>
          <p class="game-header lng">Tap the logo to start!</p>
          <p class="clicks lng"></p>
          <button class="click-btn"><img src="../img/logo.png" </button>
        </section>
        `
  }
}

const Footer = {
  render: () => {
    return `
        <section class="footer">
          <p>Cafe Doza, inst: @cafedoza</p>
        </section>
        `
  }
}