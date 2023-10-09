function myView() {
    let myContainer = null;
    let routesObj = null;

    let modalHeaderMenu = null;
    let headerMenu = null;
    let plusHeaderMenu = null;
    let authModal = null;
    let modalOverlay = null;
    let inputPassword = null;
    let inputName = null;
    let inputEmail = null;
    let errorDiv = null;
    let buttonLog = null;
    let buttonReg = null;
    let firstTimeText = null;
    let hiAgainText = null;
    let alrHaveAccBtn = null;
    let newHereBtn = null;
    let menuContainer = null;
    let authBtn = null;
    let logoutBtn = null;
    let successRegModal = null;
    let searchInput = null;
    let myBonusesMenu = null;

    this.init = function (container, routes) {
        myContainer = container;
        routesObj = routes;
    }

    this.renderContent = function (hashPageName) {
        let routeName = "default";


        if (hashPageName.length > 0) {
            routeName = hashPageName in routesObj ? hashPageName : "error";
        }

        window.document.title = routesObj[routeName].title;
        myContainer.innerHTML = routesObj[routeName].render(`${routeName}`);

        modalHeaderMenu = myContainer.querySelector('.open-menu');
        headerMenu = myContainer.querySelector('.div-menu');
        plusHeaderMenu = myContainer.querySelector('.plus');
        authModal = myContainer.querySelector('.auth-modal');
        modalOverlay = myContainer.querySelector('.modal-overlay');

        buttonLog = myContainer.querySelector('.log-btn');
        buttonReg = myContainer.querySelector('.reg-btn');

        inputEmail = myContainer.querySelector('.email-input');
        inputPassword = myContainer.querySelector('.input-password');
        inputName = myContainer.querySelector('.name-input');
        errorDiv = myContainer.querySelector('.error-auth');
        firstTimeText = myContainer.querySelector('.first-time-text');
        hiAgainText = myContainer.querySelector('.hi-again-text');
        alrHaveAccBtn = myContainer.querySelector('.have-acc');
        newHereBtn = myContainer.querySelector('.new-here');
        menuContainer = myContainer.querySelector('.menu-container');
        authBtn = myContainer.querySelector('.login-btn');
        logoutBtn = myContainer.querySelector('.logout-btn');
        successRegModal = myContainer.querySelector('.successful-reg-modal');
        searchInput = myContainer.querySelector('.search-input');
        myBonusesMenu = myContainer.querySelector('.mybonuses');
        const wow = new WOW({
            boxClass: 'wow', /* класс, который необходим для работы wow.js */
            animateClass: 'animate__animated', /* класс, который будет автоматически добавляться анимируемым элементам при прокрутке страницы */
            offset: 30, /* по-умолчанию установлено значение 0, то есть как только при прокрутке страницы, элемент достигает низа окна браузера проигрываться анимация, в данном случае анимация начнется на 30px выше от низа окна браузера */
            mobile: true, /* если true, то на мобильных тоже будет анимация, если false, то на мобильных анимация отключается */
            live: true /* если true, то анимация будет работать даже на динамически добавляемых элементах, если false, то только на тех элементах, которые были на странице при ее загрузке */
        })
        wow.init(); /* Инициализация плагина с установленными выше свойствами */
    }

    // this.showResult = function (result, scanner) {
    //     myContainer.getElementById('result').innerHTML = `
    //     <h2>Success!</h2>
    //     <p><a href="${result}">${result}</a></p>
    //     `;
    //     scanner.clear();
    //     myContainer.getElementById('reader').remove();
    // }
    this.clearInputs = function () {
        inputPassword.value = "";
        inputEmail.value = "";
        inputName.value = "";
        errorDiv.innerHTML = "";
    }

    this.openHeaderMenu = function () {
        headerMenu.classList.toggle(true);
        modalHeaderMenu.classList.remove('closed');
        plusHeaderMenu.classList.add('active');
        plusHeaderMenu.classList.remove('inactive');
        headerMenu.classList.add('active');
        headerMenu.classList.remove('inactive');
        modalHeaderMenu.classList.add('active');
        modalHeaderMenu.classList.remove('inactive');
    }

    this.closeHeaderMenu = function () {
        headerMenu.classList.toggle(false);
        modalHeaderMenu.classList.add('closed');
        plusHeaderMenu.classList.add('inactive');
        plusHeaderMenu.classList.remove('active');
        headerMenu.classList.remove('active');
        headerMenu.classList.add('inactive');
        modalHeaderMenu.classList.remove('active');
        modalHeaderMenu.classList.add('inactive');
    }

    this.openAuthModal = function () {
        modalHeaderMenu.classList.add('closed');
        authModal.classList.remove('closed');
        modalOverlay.classList.remove('closed');
        plusHeaderMenu.classList.remove('active');
    }

    this.closeAuthModal = function () {
        this.clearInputs();
        this.changeToLog();
        authModal.classList.add('closed');
        modalOverlay.classList.add('closed');
    }

    this.changeToReg = function () {
        this.clearInputs();
        buttonLog.classList.add('closed');
        buttonReg.classList.remove('closed');
        firstTimeText.classList.remove('closed');
        hiAgainText.classList.add('closed');
        inputName.classList.remove('closed');
        alrHaveAccBtn.classList.remove('closed');
        newHereBtn.classList.add('closed');
    }

    this.changeToLog = function () {
        this.clearInputs();
        buttonLog.classList.remove('closed');
        buttonReg.classList.add('closed');
        firstTimeText.classList.add('closed');
        hiAgainText.classList.remove('closed');
        inputName.classList.add('closed');
        alrHaveAccBtn.classList.add('closed');
        newHereBtn.classList.remove('closed');
    }

    this.successLog = function () {
        this.clearInputs();
        authModal.classList.add('closed');
        modalOverlay.classList.add('closed');
        window.location.hash = "#bonuses";
    }

    this.logout = function () {
        logoutBtn.classList.add('closed');
        authBtn.classList.remove('closed');
        myBonusesMenu.classList.add('closed');
        window.location.hash = "#main";
    }

    this.successReg = function () {
        this.clearInputs();
        authModal.classList.add('closed');
        modalOverlay.classList.add('closed');
        window.location.hash = "#bonuses";
        successRegModal.classList.remove('closed');
    }

    this.closeSuccessRegModal = function () {
        successRegModal.classList.add('closed');
        modalOverlay.classList.add('closed');
    }

    this.renderMenu = function (drinks) {
        if (menuContainer) {
            for (let key in drinks) {
                const drink = drinks[key];
                menuContainer.innerHTML += DrinkDiv.render(drink.title, drink.image);
            }
        }
    }

    this.searchDrink = function (value) {
        const drinkTitle = document.querySelectorAll('.drink-title');

        if (value !== '') {
            drinkTitle.forEach((element) => {
                let elementTitle = element.innerText.toLowerCase();
                let elementParent = element.closest('.drink-container');

                if (elementTitle.search(value) === -1) {
                    elementParent.classList.add('closed');
                } else {
                    elementParent.classList.remove('closed');
                }

            });
        } else {
            drinkTitle.forEach((element) => {
                let elementParent = element.closest('.drink-container');
                elementParent.classList.remove('closed');
            });
        }
    }

    this.clearSearchInput = function () {
        searchInput.value = "";
    }

    this.changePageUserIn = function (user) {
        const hashPageName = location.hash.slice(1).toLowerCase();
        if (hashPageName === "bonuses") {
            const bonusText = myContainer.querySelector('.bonuses-greeting');
            bonusText.innerText = `Check your bonuses, ${user.name}!`;
            const bonusNumber = myContainer.querySelector('.bonus-number');
            bonusNumber.innerText = user.bonuses;
        }
        myBonusesMenu.classList.remove('closed');
        this.clearInputs();
        logoutBtn.classList.remove('closed');
        authBtn.classList.add('closed');
        const qr = myContainer.querySelector('.qr-user');
        qr.setAttribute('src', `${user.qrUrl}`);
    }

    this.showBonuses = function (user) {
        const bonusText = myContainer.querySelector('.bonuses-greeting');
        const progressBar = myContainer.querySelector('.cup-progress');
        const userProgress = user.bonuses / 10 * 100;
        bonusText.innerHTML = `You have ${user.bonuses}/10 cups♥`;
        progressBar.animate(
            [
                {width: "0"},
                {width: userProgress + '%'},
            ],
            {
                duration: 1000,
                fill: "forwards",
                easing: "ease-in-out",
            },
        );
    }

    this.clearCodeInput = function () {
        myContainer.querySelector('.code-input').value = "";
    }

    this.showPlusOneModal = function (user) {
        const plusOneModal = myContainer.querySelector('.modal-coffee');
        plusOneModal.classList.remove('closed');
        setTimeout(() => {plusOneModal.classList.add('closed');}, 3000);
        this.showBonuses(user);
    }

    this.showWinBonusModal = function (user) {
        const winBonusModal = myContainer.querySelector('.modal-congratulations');
        const bonusNumber = myContainer.querySelector('.bonus-number');
        bonusNumber.innerText = user.winCups;
        winBonusModal.classList.remove('closed');
        setTimeout(() => {winBonusModal.classList.add('closed');}, 3000);
        this.showBonuses(user);
    }

    this.closePlusOneModal = function () {
        const plusOneModal = myContainer.querySelector('.modal-coffee');
        plusOneModal.classList.add('closed');
    }

    this.closeWinBonusModal = function () {
        const winBonusModal = myContainer.querySelector('.modal-congratulations');
        winBonusModal.classList.add('closed');
    }
    this.errorAuth = function (errorCode) {
        const errorDiv = myContainer.querySelector('.error-auth');
        if (errorCode === 'auth/invalid-email' || errorCode === 'auth/weak-password') {
            errorDiv.innerHTML = 'Invalid password. It has to contain 6 symbols';
        } else if (errorCode === 'auth/missing-password' || errorCode === 'auth/missing-email') {
            errorDiv.innerHTML = 'Something is missing';
        } else if (errorCode === 'auth/email-already-in-use') {
            errorDiv.innerHTML = 'The user is already registrated';
        } else if (errorCode === 'auth/user-not-found') {
            errorDiv.innerHTML = 'The user is not found';
        } else if (errorCode === 'auth/wrong-password') {
            errorDiv.innerHTML = 'Invalid password. Try again, pls...';
        }
    }

    this.error = function (errorName) {
        const errorBlock = myContainer.querySelector('.error-modal');
        errorBlock.classList.remove('closed');
        const errorText = myContainer.querySelector('.error-text');
        if (errorName === "empty input") {
            errorText.textContent = "Please fill the input";
        } else if (errorName === "code not found") {
            errorText.textContent = "Code is not found";
        } else  {
            errorText.textContent = "Error: " + errorName;
        }
        setTimeout(() => {errorBlock.classList.add('closed');}, 3000);
    }

    this.updateClicks = function (clicks) {
        const clicksDiv = myContainer.querySelector('.clicks');
        clicksDiv.textContent = clicks;
    }

    this.endGame = function () {
        const gameStatus = myContainer.querySelector('.game-header');
        const gameBtn = myContainer.querySelector('.click-btn');
        gameBtn.setAttribute('disabled', 'disabled');
        setTimeout(() => {gameBtn.removeAttribute('disabled');}, 2000);
        gameStatus.textContent = 'The end';
    }

    this.heyCheater = function () {
        const gameStatus = myContainer.querySelector('.game-header');
        gameStatus.textContent = "Bro... that's unfair";
    }

    this.updateGameTime = function (time) {
        const gameStatus = myContainer.querySelector('.game-header');
        gameStatus.textContent = time;
    }

    this.addBack = function (user) {
        const footer = myContainer.querySelector('.footer');
        const p = document.createElement('p');
        p.textContent = user.name;
        footer.append(p);
    }

    this.openCode = function () {
        const code = myContainer.querySelector('.QR-open');
        code.classList.remove('closed');
        modalOverlay.classList.remove('closed');
    }

    this.closeCode = function () {
        const code = myContainer.querySelector('.QR-open');
        code.classList.add('closed');
        modalOverlay.classList.add('closed');
    }
}

export default myView;