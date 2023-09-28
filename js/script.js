import {
    getDatabase,
    ref,
    set,
    update,
    get,
    child,
    remove,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFgq_UWYWiocaTjAnEr8VH22RLEZFHKZ0",
    authDomain: "coffeedoza-73a9f.firebaseapp.com",
    projectId: "coffeedoza-73a9f",
    storageBucket: "coffeedoza-73a9f.appspot.com",
    messagingSenderId: "606035213686",
    appId: "1:606035213686:web:27f59fd0a89fb457418e57",
    databaseURL: "https://coffeedoza-73a9f-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const components = {
    header: Header,
    modalAuth: ModalAuth,
    main: Main,
    coffeeShops: CoffeeShops,
    menu: Menu,
    myProgress: Progress,
    game: GameComp,
    footer: Footer,
}

const routes = {
    main: HomePage,
    drinklist: MenuPage,
    bonuses: MyBonuses,
    default: HomePage,
}

const mySPA = (function () {
    //CONTROLLER
    function myController() {
        let myContainer = null;
        let myModel = null;
        let inputEmail = null;
        let inputPassword = null;
        let inputName = null;
        let modalHeaderMenu = null;
        let headerMenu = null;
        let successRegModal = null;
        let searchInput = null;
        let searchCodeInput = null;
        let plusOneModal = null;
        let winBonusModal = null;


        function updateState() {
            const hashPageName = location.hash.slice(1).toLowerCase();

            myModel.loadMenu();
            myModel.manageUser();

            if (hashPageName.startsWith('scroll-')) {
                scrollToSection(hashPageName);
            } else {
                myModel.updateState(hashPageName);
            }
            myContainer.addEventListener('keydown', e => {
                if (e.code === "ArrowUp" || e.code === "Space") {
                    e.preventDefault();
                }
            })


            headerMenu = myContainer.querySelector('.div-menu');
            modalHeaderMenu = myContainer.querySelector('.open-menu');
            let openAuthBtn = myContainer.querySelector('.login-btn');
            let closeAuthModalBtn = myContainer.querySelector('.close-auth');

            let changeToRegBtn = myContainer.querySelector('.new-here');
            let changeToLogBtn = myContainer.querySelector('.have-acc');
            let signInBtn = myContainer.querySelector('.log-btn');
            let signUpBtn = myContainer.querySelector('.reg-btn');
            let signOutBtn = myContainer.querySelector('.logout-btn');
            let clearSearchBtn = myContainer.querySelector('.clear-search-btn');

            inputEmail = myContainer.querySelector('.email-input');
            inputPassword = myContainer.querySelector('.input-password');
            inputName = myContainer.querySelector('.name-input');
            successRegModal = myContainer.querySelector('.successful-reg-modal');

            headerMenu.addEventListener('click', openHeaderMenu);
            openAuthBtn.addEventListener('click', openAuthModal);
            closeAuthModalBtn.addEventListener('click', closeAuthModal);
            changeToRegBtn.addEventListener('click', changeToReg);
            changeToLogBtn.addEventListener('click', changeToLog);
            signInBtn.addEventListener('click', signIn);
            signUpBtn.addEventListener('click', signUp);
            signOutBtn.addEventListener('click', logout);
            successRegModal.addEventListener('click', closeSuccessRegModal);

            if (hashPageName === "drinklist") {
                searchInput = myContainer.querySelector('.search-input');
                searchInput.addEventListener('input', searchDrink)
                clearSearchBtn.addEventListener('click', function () {
                    clearSearchInput();
                    searchDrink();
                });
            }

            if (hashPageName === "bonuses") {
                const checkBonusesBtn = myContainer.querySelector('.check-bonuses-btn');
                checkBonusesBtn.addEventListener('click', checkBonuses);
                searchCodeInput = myContainer.querySelector('.code-input');
                const searchCodeBtn = myContainer.querySelector('.search-btn');
                searchCodeBtn.addEventListener('click', searchCode);
                plusOneModal = myContainer.querySelector('.modal-coffee');
                winBonusModal = myContainer.querySelector('.modal-congratulations');
                plusOneModal.addEventListener('click', closePlusOneModal);
                winBonusModal.addEventListener('click', closeWinBonusModal);
                const startGameBtn = myContainer.querySelector('.click-btn');
                startGameBtn.addEventListener('click', startGame);
            }

        }

        function openHeaderMenu() {
            let menuState = "";
            if (modalHeaderMenu.classList.contains('closed')) {
                menuState = "closed";
            } else {
                menuState = "shown";
            }
            myModel.openHeaderMenu(menuState);
        }

        function openAuthModal() {
            myModel.openAuthModal();
        }

        function closeAuthModal() {
            myModel.closeAuthModal();
        }

        function changeToReg() {
            myModel.changeToReg();
        }

        function changeToLog() {
            myModel.changeToLog();
        }

        function signIn() {
            myModel.signIn(inputEmail.value, inputPassword.value);
        }

        function signUp() {
            myModel.signUp(inputEmail.value, inputPassword.value, inputName.value);
        }

        function logout() {
            myModel.logout();
        }

        function closeSuccessRegModal() {
            myModel.closeSuccessRegModal();
        }

        function searchDrink() {
            myModel.searchDrink(searchInput.value.toLowerCase());
        }

        function clearSearchInput() {
            myModel.clearSearchInput();
        }

        function checkBonuses() {
            myModel.checkBonuses();
        }

        function searchCode() {
            myModel.searchCode(searchCodeInput.value);
        }

        function closePlusOneModal() {
            myModel.closePlusOneModal();
        }

        function closeWinBonusModal() {
            myModel.closeWinBonusModal();
        }

        function startGame() {
            myModel.startGame();
        }

        return {
            init: function (container, model) {
                myContainer = container;
                myModel = model;

                // Вешаем слушателей на событие hashchange и кликам по пунктам меню
                window.addEventListener("hashchange", updateState);
                updateState();
            }
        }
    }

    //MODEL


    function myModel() {
        let myView = null;
        let clicks = 0;
        let timeOut = 5000;
        let gameIsStarted = false;

        this.init = function (view) {
            myView = view;
        }

        this.updateState = function (hashPageName) {
            myView.renderContent(hashPageName);
        }

        this.loadMenu = async function () {
            const snapshot = await get(child(ref(database), 'MenuList'));
            if (snapshot.exists()) {
                const drinks = snapshot.val();
                myView.renderMenu(drinks);
            }
        }

        this.openHeaderMenu = function (state) {
            if (state === "closed") {
                myView.openHeaderMenu();
            } else {
                myView.closeHeaderMenu();
            }
        }

        this.openAuthModal = function () {
            myView.openAuthModal();
        }

        this.closeAuthModal = function () {
            myView.closeAuthModal();
        }

        this.changeToReg = function () {
            myView.changeToReg();
        }

        this.changeToLog = function () {
            myView.changeToLog();
        }

        this.signIn = function (email, password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    update(ref(database, "UsersList/" + user.uid),
                        {
                            email: email,
                        })
                    myView.successLog();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    myView.errorAuth(errorCode);
                });
        }

        this.signUp = function (email, password, name) {
            createUserWithEmailAndPassword(auth, email, password, name)
                .then((userCredential) => {
                    const user = userCredential.user;
                    set(ref(database, "UsersList/" + user.uid),
                        {
                            email: email,
                            name: name,
                            bonuses: 0,
                            record: 0,
                            winCups: 0,
                        })
                    myView.successReg();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    myView.errorAuth(errorCode);
                });
        }

        this.logout = function () {
            signOut(auth).then(() => {
                myView.logout();
            }).catch((error) => {
                const errorCode = error.code;
                myView.error(errorCode);
            });
        }

        this.manageUser = function () {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = auth.currentUser.uid;
                    get(child(ref(database), "UsersList/" + uid))
                        .then(snapshot => {
                            const user = snapshot.val();
                            myView.changePageUserIn(user);
                        })
                }
            });
        }

        this.checkProgress = function () {
            myView.checkProgress();
        }

        this.closeSuccessRegModal = function () {
            myView.closeSuccessRegModal();
        }

        this.searchDrink = function (value) {
            myView.searchDrink(value);
        }

        this.clearSearchInput = function () {
            myView.clearSearchInput();
        }

        this.checkBonuses = function () {
            const userUid = auth.currentUser.uid;
            get(child(ref(database), "UsersList/" + userUid))
                .then(snapshot => {
                    const user = snapshot.val();
                    myView.showBonuses(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    myView.error(errorCode);
                });
        }

        this.searchCode = async function (code) {
            if (code) {
                const userUid = auth.currentUser.uid;
                const snapshot = await get(child(ref(database), 'Codes/' + code));
                if (snapshot.exists()) {
                    remove(child(ref(database), 'Codes/' + code));
                    get(child(ref(database), "UsersList/" + userUid))
                        .then(snapshot => {
                            const user = snapshot.val();
                            user.bonuses += 1;
                            update(ref(database, "UsersList/" + userUid), user);
                            if (Number(user.bonuses < 10)) {
                                myView.showPlusOneModal(user);
                            } else if (Number(user.bonuses === 10)) {
                                user.winCups += 1;
                                user.bonuses = 0;
                                update(ref(database, "UsersList/" + userUid), user);
                                myView.showWinBonusModal(user);
                            }
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            console.log(errorCode);
                        });
                } else {
                    const errorName = 'code not found';
                    myView.error(errorName);
                }
            } else {
                const errorName = 'empty input';
                myView.error(errorName);
            }
            myView.clearCodeInput();
        }

        this.closePlusOneModal = function () {
            myView.closePlusOneModal();
        }

        this.closeWinBonusModal = function () {
            myView.closeWinBonusModal();
        }

        this.formatTime = function (ms) {
            return Number.parseFloat(ms / 1000).toFixed(2);
        }

        this.startGame = function () {
            if (gameIsStarted) {
                clicks += 1;
                myView.updateClicks(clicks);
            } else {
                gameIsStarted = true;
                clicks = 0;
                myView.updateClicks(clicks);
                const startTime = Date.now();
                myView.updateGameTime(this.formatTime(timeOut));
                const interval = setInterval(() => {
                    const delta = Date.now() - startTime;
                    myView.updateGameTime(this.formatTime(timeOut - delta));
                }, 100);

                setTimeout(() => {
                    clearInterval(interval);
                    myView.endGame();
                    gameIsStarted = false;
                    const uid = auth.currentUser.uid;
                    get(child(ref(database), "UsersList/" + uid))
                        .then(snapshot => {
                            const user = snapshot.val();
                            if (user.record < clicks) {
                                user.record = clicks;
                                update(ref(database, "UsersList/" + uid), user);
                            }
                        })
                }, timeOut);
            }
        }

    }

    //VIEW
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
                bonusNumber.innerText = user.winCups;
            }
            myBonusesMenu.classList.remove('closed');
            this.clearInputs();
            logoutBtn.classList.remove('closed');
            authBtn.classList.add('closed');
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

        this.updateGameTime = function (time) {
            const gameStatus = myContainer.querySelector('.game-header');
            gameStatus.textContent = time;
        }
    }

    return {
        init: function ({container, routes, components}) {
            this.renderComponents(container, components);

            const view = new myView();
            const controller = new myController();
            const model = new myModel();

            // Связываем части модуля
            view.init(document.getElementById(container), routes);
            model.init(view);
            controller.init(document.getElementById(container), model);
        },

        renderComponents: function (container, components) {
            const root = document.getElementById(container);
            const componentsList = Object.keys(components);
            for (let item of componentsList) {
                root.innerHTML += components[item].render("component");
            }
        },
    };
}());

document.addEventListener("DOMContentLoaded", mySPA.init({
    container: "app",
    routes: routes,
    components: components,
}));
