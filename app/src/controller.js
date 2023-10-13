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
    let adminInput = null;
    let registeredUser = null;


    async function updateState() {
        const hashPageName = location.hash.slice(1).toLowerCase();
        // myModel.loadMenu();

        console.log('before updateState and manageUser ' + registeredUser)
        myModel.updateState(hashPageName);

        registeredUser = await myModel.manageUser(registeredUser);
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
        signInBtn.addEventListener('pointerdown', await signIn);
        signUpBtn.addEventListener('pointerdown', await signUp);
        signOutBtn.addEventListener('pointerdown', logout);
        successRegModal.addEventListener('pointerdown', closeSuccessRegModal);
        let token =sessionStorage.getItem('user_token');
        if (hashPageName === "drinklist") {
            // searchInput = myContainer.querySelector('.search-input');
            // searchInput.addEventListener('input', searchDrink)
            // clearSearchBtn.addEventListener('pointerdown', function () {
            //     clearSearchInput();
            //     searchDrink();
            // });
        }
        if (hashPageName === "adminpage" && token) {
            const role = await myModel.getRole();
            console.log('ROLE INSIDE ADMINPAGE ' + role)
            if (role === 'ADMIN') {
                const scanBtn = myContainer.querySelector('#scan-qr-btn');
                scanBtn.addEventListener('pointerdown', scanQR);
                const addCupsBtn = myContainer.querySelector('.add-cups');
                const removeCupsBtn = myContainer.querySelector('.remove-cups');
                addCupsBtn.addEventListener('pointerdown', plusCupInput);
                removeCupsBtn.addEventListener('pointerdown', minusCupInput);
                adminInput = myContainer.querySelector('.input-admin');
                const addCupsToUserBtn = myContainer.querySelector('#addbtn-admin');
                const removeCupsFromUserBtn = myContainer.querySelector('#removebtn-admin');
                addCupsToUserBtn.addEventListener('pointerdown', addCupsAdmin);
                removeCupsFromUserBtn.addEventListener('pointerdown', removeGiftsAdmin);
            } else {
                window.location.hash = '#main';
            }
        }

        if (hashPageName === "bonuses") {
            console.log('TOKEN ' + token);
            if (token) {
                // const checkBonusesBtn = myContainer.querySelector('.check-bonuses-btn');
                // checkBonusesBtn.addEventListener('pointerdown', checkBonuses);
                // searchCodeInput = myContainer.querySelector('.code-input');
                // const searchCodeBtn = myContainer.querySelector('.search-btn');
                // searchCodeBtn.addEventListener('pointerdown', searchCode);
                // checkBonuses();
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
            } else {
                window.location.hash = '#main';
            }
        }

    }

    function addCupsAdmin() {
        myModel.addCupsAdmin(adminInput.value);
    }

    function removeGiftsAdmin() {
        myModel.removeGiftsAdmin(adminInput.value);
    }

    function plusCupInput() {
        console.log('plusCupInput' + adminInput.value);
        myModel.plusCupInput(Number(adminInput.value));
    }

    function minusCupInput() {
        myModel.minusCupInput(Number(adminInput.value));
    }

    async function scanQR() {
        await myModel.scannerQR();
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

    async function signIn() {
        console.log('we before regUser in signUp')

        await myModel.loginUser(inputEmail.value, inputPassword.value);

        console.log('we finish in signIn' + sessionStorage.getItem('user_token'));

    }

    async function signUp() {
        console.log('we before regUser in signUp')
        registeredUser = await myModel.regUser(inputEmail.value, inputPassword.value, inputName.value);
        console.log('we finish in signUp' + registeredUser)
    }

    function logout() {
        registeredUser = myModel.logoutUser();
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

    async function startGame() {
        await myModel.startGame();
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