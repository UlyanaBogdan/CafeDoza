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
    let signInBtn = null;
    let signUpBtn = null;


    async function updateState() {
        const hashPageName = location.hash.slice(1).toLowerCase();
        // myModel.loadMenu();

        myModel.updateState(hashPageName);

        // await myModel.manageUser();
        // await myModel.showsomething();


        headerMenu = myContainer.querySelector('.div-menu');
        modalHeaderMenu = myContainer.querySelector('.open-menu');
        let openAuthBtn = myContainer.querySelector('.login-btn');
        let closeAuthModalBtn = myContainer.querySelector('.close-auth');

        let changeToRegBtn = myContainer.querySelector('.new-here');
        let changeToLogBtn = myContainer.querySelector('.have-acc');
        signInBtn = myContainer.querySelector('.log-btn');
        signUpBtn = myContainer.querySelector('.reg-btn');
        let signOutBtn = myContainer.querySelector('.logout-btn');
        let clearSearchBtn = myContainer.querySelector('.clear-search-btn');

        inputEmail = myContainer.querySelector('.email-input');
        inputEmail.addEventListener('input', checkEmail);

        inputPassword = myContainer.querySelector('.input-password');
        inputPassword.addEventListener('input', checkPassword);

        inputName = myContainer.querySelector('.name-input');



        successRegModal = myContainer.querySelector('.successful-reg-modal');

        headerMenu.addEventListener('pointerdown', openHeaderMenu);
        openAuthBtn.addEventListener('pointerdown', openAuthModal);
        closeAuthModalBtn.addEventListener('pointerdown', closeAuthModal);
        changeToRegBtn.addEventListener('pointerdown', changeToReg);
        changeToLogBtn.addEventListener('pointerdown', changeToLog);
        signInBtn.addEventListener('pointerdown', signIn);
        signUpBtn.addEventListener('pointerdown', signUp);
        signOutBtn.addEventListener('pointerdown', logout);
        successRegModal.addEventListener('pointerdown', closeSuccessRegModal);

        if (hashPageName === "drinklist") {
            // searchInput = myContainer.querySelector('.search-input');
            // searchInput.addEventListener('input', searchDrink)
            // clearSearchBtn.addEventListener('pointerdown', function () {
            //     clearSearchInput();
            //     searchDrink();
            // });
        }
        if (hashPageName === "adminpage") {
            const scanBtn = myContainer.querySelector('#scan-qr-btn');
            scanBtn.addEventListener('pointerdown', scanQR);
        }

        if (hashPageName === "bonuses") {
            // const checkBonusesBtn = myContainer.querySelector('.check-bonuses-btn');
            // checkBonusesBtn.addEventListener('pointerdown', checkBonuses);
            // searchCodeInput = myContainer.querySelector('.code-input');
            // const searchCodeBtn = myContainer.querySelector('.search-btn');
            // searchCodeBtn.addEventListener('pointerdown', searchCode);
            checkBonuses();
            plusOneModal = myContainer.querySelector('.modal-coffee');
            winBonusModal = myContainer.querySelector('.modal-congratulations');
            plusOneModal.addEventListener('pointerdown', closePlusOneModal);
            winBonusModal.addEventListener('pointerdown', closeWinBonusModal);
            const startGameBtn = myContainer.querySelector('.click-btn');
            startGameBtn.addEventListener('pointerdown', startGame);
            const code = myContainer.querySelector('.QR-block');
            code.addEventListener('pointerdown', openCode);
            const openQR = myContainer.querySelector('.QR-open');
            openQR.addEventListener('pointerdown', closeCode);
        }

    }

    function scanQR() {
        myModel.scannerQR();
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
        myModel.loginUser(inputEmail.value, inputPassword.value);
    }

    function signUp() {
        myModel.regUser(inputEmail.value, inputPassword.value, inputName.value);
    }

    function logout() {
        myModel.logoutUser();
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

    function openCode() {
        myModel.openCode();
    }

    function closeCode() {
        myModel.closeCode();
    }

    function checkEmail() {
        if (signInBtn.classList.contains('closed')) {
            myModel.checkEmail(inputEmail.value);
        }
    }

    function checkPassword() {
        if (signInBtn.classList.contains('closed')) {
            myModel.checkPassword(inputPassword.value);
        }
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

export default myController;