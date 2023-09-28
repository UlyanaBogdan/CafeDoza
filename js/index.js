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
    menu: DrinkList,
    bonuses: MyBonuses,
    default: HomePage,
}

const mySPA = (function () {
    //CONTROLLER
    function myController() {
        let MyContainer = null;
        let MyModel = null;
        let inputEmail = null;
        let inputPassword = null;
        let inputName = null;
        let modalHeaderMenu = null;
        let headerMenu = null;


        function updateState() {
            const hashPageName = location.hash.slice(1).toLowerCase();

            myModel.manageUser(); //DO IT

            if (hashPageName.startsWith('scroll-')) {
                scrollToSection(hashPageName);
            } else {
                myGlobalModel.updateState(hashPageName);
            }

            myModel.loadMenu();

            headerMenu = myContainer.querySelector('.div-menu');
            modalHeaderMenu = myContainer.querySelector('.open-menu');
            let openAuthBtn = myContainer.querySelector('.login-btn');
            let closeAuthModalBtn = myContainer.querySelector('.close-auth');
            let changeToRegBtn = myContainer.querySelector('.new-here');
            let changeToLogBtn = myContainer.querySelector('.have-acc');
            let signInBtn = myContainer.querySelector('.log-btn');
            let signUpBtn = myContainer.querySelector('.reg-btn');
            let signOutBtn = myContainer.querySelector('.logout-btn');
            let checkBonusesBtn = myContainer.querySelector('.check-bonuses-btn');

            if (hashPageName === "index" || hashPageName === "") {
                headerMenu.addEventListener('click', openHeaderMenu);
                openAuthBtn.addEventListener('click', openAuthModal);
                closeAuthModalBtn.addEventListener('click', closeAuthModal);
                changeToRegBtn.addEventListener('click', changeToReg);
                changeToLogBtn.addEventListener('click', changeToLog);
                signInBtn.addEventListener('click', signIn);
                signUpBtn.addEventListener('click', signUp);
                signOutBtn.addEventListener('click', logout);
                checkBonusesBtn.addEventListener('click', checkProgress);
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

        function logout() {0
            myModel.logout();
        }

        function checkProgress() {
            myModel.checkProgress();
        }


        function scrollToSection(sectionId) {

            const scrollTarget = document.getElementById(sectionId);

            if (scrollTarget) {
                const topOffset = document.querySelector('header').offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;

                window.scrollBy({
                    top: offsetPosition,
                    left: 0,
                    behavior: 'smooth',
                });
            };
        };

        return {
            init: function (container, model) {
                myContainer = container;
                myModel = model;

                // Вешаем слушателей на событие hashchange и кликам по пунктам меню
                window.addEventListener("hashchange", updateState);

                updateState();                                                     //первая отрисовка

                }
            }
        })
    }

    //MODEL


function myModel() {
    import { getDatabase, ref, set, update, get, child } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

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

    function myModel() {
        let myView = null;

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

        this.manageUser = function () {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    get(child(ref(database), "UsersList/" + uid))
                        .then(snapshot => {
                            const user = snapshot.val();
                            myView.renderInfo(user);
                            myView.setUsername(user.username);
                        })
                }
            });
        }

        this.signIn = function (email, password) {
            signInWithEmailAndPassword(auth, email, password, name)
                .then((userCredential) => {
                    const user = userCredential.user;

                    update(ref(database, "UsersList/" + user.uid),
                        {
                            email: email,
                            name: name;
                        })
                    myView.successLog();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    myView.error(errorCode);
                });
        }

        this.signUp = function (email, password, name) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    set(ref(database, "UsersList/" + user.uid),
                        {
                            email: email,
                            name: name,
                            bonuses: "no data",
                            record: "no data",
                        })
                    myView.successReg();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    myView.error(errorCode);
                });
        }

        this.logout = function () {
            signOut(auth).then(() => {
                myView.logout();
            }).catch((error) => {
                myView.logoutError(error);
            });
        }

        this.checkProgress = function () {
            myView.checkProgress();
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
        inputEmail = myContainer.querySelector('.email-input');
        inputPassword = myContainer.querySelector('.input-password');
        inputName = myContainer.querySelector('.name-input');
        errorDiv = myContainer.querySelector('.error-auth');
        firstTimeText = myContainer.querySelector('.first-time-text');
        hiAgainText = myContainer.querySelector('.hi-again-text');
        alrHaveAccBtn = myContainer.querySelector('.have-acc');
        newHereBtn = myContainer.querySelector('.new-here');
        menuContainer = myContainer.querySelector('.menu-container');
    }

    this.openHeaderMenu = function () {
        headerMenu.classList.toggle('closed');
        modalHeaderMenu.classList.toggle('flat-downborder');
        modalHeaderMenu.classList.toggle('open-headerchange');
        headerMenu.classList.toggle('open-headerchange');
        plusHeaderMenu.style.animation = 'spin 0.2s linear 0s normal forwards';
        headerMenu.style.animation = 'scaleHeaderUp 0.3s linear 0s normal forwards';
        modalHeaderMenu.style.animation = 'scaleHeaderUp 0.3s linear 0s normal forwards';
    }

    this.closeHeaderMenu = function () {
        headerMenu.classList.toggle('closed');
        modalHeaderMenu.classList.toggle('flat-downborder');
        modalHeaderMenu.classList.toggle('open-headerchange');
        headerMenu.classList.toggle('open-headerchange');
        plusHeaderMenu.style.animation = 'spinBack 0.2s linear 0s normal forwards';
        headerMenu.style.animation = 'scaleHeaderDown 0.3s linear 0s normal forwards';
        modalHeaderMenu.style.animation = 'scaleHeaderDown 0.3s linear 0s normal forwards';
    }

    this.openAuthModal = function () {
        authModal.style.display = 'inline-block';
        modalHeaderMenu.classList.toggle('closed');
        headerMenu.classList.toggle('flat-downborder');
        modalHeaderMenu.classList.toggle('open-headerchange');
        headerMenu.classList.toggle('open-headerchange');
        modalOverlay.classList.toggle('closed');
    }

    this.closeAuthModal = function () {
        authModal.style.display = 'none';
        inputPassword.value = "";
        inputEmail.value = "";
        inputName.value = "";
        errorDiv.innerHTML = "";
        modalOverlay.classList.toggle('closed');
    }

    this.changeToReg = function () {
        inputPassword.value = "";
        inputEmail.value = "";
        errorDiv.innerHTML = "";
        buttonLog.classList.add('closed');
        buttonReg.classList.remove('closed');
        firstTimeText.classList.remove('closed');
        hiAgainText.classList.add('closed');
        inputName.classList.remove('closed');
        alrHaveAccBtn.classList.remove('closed');
        newHereBtn.classList.add('closed');
    }

    this.changeToLog = function () {
        inputPassword.value = "";
        inputEmail.value = "";
        inputName.value = "";
        errorDiv.innerHTML = "";
        buttonLog.classList.remove('closed');
        buttonReg.classList.add('closed');
        firstTimeText.classList.add('closed');
        hiAgainText.classList.remove('closed');
        inputName.classList.add('closed');
        alrHaveAccBtn.classList.add('closed');
        newHereBtn.classList.remove('closed');
    }

    this.renderMenu = function (drinks) {
        if (menuContainer) {
            for (let key in drinks) {
                const drink = drinks[key];
                menuContainer.innerHTML += ExerciseBlock.render(exercise.title, exercise.image, exercise.instruction);
            }
        }
    }

    return {
        init: function ({ container, routes, components }) {
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
