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
    let bonusText = null;

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
        this.closeEmailErr();
        this.closePassErr();
    }

    this.invalidEmail = function () {
        const errorDiv = myContainer.querySelector('.error-email');
        errorDiv.textContent = "Invalid email. Please try again";
    }

    this.invalidPassword = function () {
        const errorDiv = myContainer.querySelector('.error-password');
        errorDiv.textContent = "It must be at least 6 characters long and contain at least one uppercase letter, and one number digit";
    }
    this.closePassErr = function () {
        const errorDiv = myContainer.querySelector('.error-password');
        errorDiv.textContent = "";
    }

    this.closeEmailErr = function () {
        const errorDiv = myContainer.querySelector('.error-email');
        errorDiv.textContent = "";
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

    this.successLog = function (user) {
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

    this.successReg = function (user) {
        this.successLog(user);
        successRegModal.classList.remove('closed');
        setTimeout(() => {successRegModal.classList.add('closed');}, 3000);
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

    this.changePageUserIn = async function () {
        const hashPageName = location.hash.slice(1).toLowerCase();
        const gifts = sessionStorage.getItem('user_gifts');
        let qrUrl = sessionStorage.getItem('user_qr_url');
        const cups = sessionStorage.getItem('user_cups');
        if (hashPageName === "bonuses") {
            bonusText = myContainer.querySelector('.bonuses-greeting');
            const bonusNumber = myContainer.querySelector('.bonus-number');
            bonusNumber.textContent = gifts;
            const qr = myContainer.querySelector('.qr-user');
            const openQr = myContainer.querySelector('.open-qr-user');
            console.log(qrUrl);
            qr.setAttribute('src', qrUrl);
            openQr.setAttribute('src', qrUrl);
            this.showBonuses(cups);
        }
        myBonusesMenu = myContainer.querySelector('.mybonuses');
        myBonusesMenu.classList.remove('closed');
        logoutBtn.classList.remove('closed');
        authBtn.classList.add('closed');
    }

    this.showBonuses = function (cups) {
        const bonusText = myContainer.querySelector('.bonuses-greeting');
        const progressBar = myContainer.querySelector('.cup-progress');
        const userProgress = cups / 10 * 100;
        bonusText.innerHTML = `You have ${cups}/10 cups♥`;
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

    this.closeScanBtn = function () {
        const scanBtn = myContainer.querySelector('#scan-qr-btn');
        scanBtn.classList.add('closed');
    }

    this.showScanBtn = function () {
        const scanBtn = myContainer.querySelector('#scan-qr-btn');
        scanBtn.classList.remove('closed');
    }

    this.openAdminBtns = function(user) {
        const inputDiv = myContainer.querySelector('inputblock-admin');
        inputDiv.classList.remove('closed');
        const scanQRBtn = myContainer.querySelector('#scan-qr-btn');
        scanQRBtn.classList.add('closed');
        const adminButtons = myContainer.querySelector('#buttons-admin');
        adminButtons.classList.remove('closed');
        const userGiftsAdmin = myContainer.querySelector('.userGiftsForAdmin');
        userGiftsAdmin.textContent = `${user.name} has ${user.gifts} gifts`;
    }

    this.closeAdminBtns = function () {
        const scanQRBtn = myContainer.querySelector('#scan-qr-btn');
        scanQRBtn.classList.remove('closed');
        const adminButtons = myContainer.querySelector('#buttons-admin');
        adminButtons.classList.add('closed');
        const userGiftsAdmin = myContainer.querySelector('.userGiftsForAdmin');
        userGiftsAdmin.textContent = "";
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
        bonusNumber.innerText = user.gifts;
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

    this.error = function (errorName) {
        const errorBlock = myContainer.querySelector('.error-modal');
        errorBlock.classList.remove('closed');
        const errorText = myContainer.querySelector('.error-text');
        if (errorName === "empty input") {
            errorText.textContent = "Please fill the input";
        } else if (errorName === "code not found") {
            errorText.textContent = "Code is not found";
        } else if (errorName === "user not found") {
            errorText.textContent = "User is not found";
        } else {
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
        gameStatus.textContent = 'The end. Best: ' + sessionStorage.getItem('user_record');
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

    this.plusCupInput = function (value) {
        const input = myContainer.querySelector('.input-admin');
        input.value = value;
    }

    this.minusCupInput = function (value) {
        const input = myContainer.querySelector('.input-admin');
        input.value = value;
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

    this.hideUser = function () {
        myBonusesMenu = myContainer.querySelector('.mybonuses');
        myContainer.querySelector('.logout-btn').classList.add('closed');
        myContainer.querySelector('.login-btn').classList.remove('closed');
        myBonusesMenu.classList.add('closed');
        window.location.hash = "#main";
    }
}

export default myView;