import {getUrls} from "./config.js";

function myModel() {
    let myView = null;
    let clicks = 0;
    let timeOut = 5000;
    let gameIsStarted = false;
    const baseURL = getUrls.baseURL;
    const adminQrURL = getUrls.adminQrURL;
    const regURL = getUrls.regURL;
    const roleURL = getUrls.roleURL;
    const loginURL = getUrls.loginURL;
    const refreshURL = getUrls.refreshURL;
    const logOutURL = getUrls.logOutURL;
    const addCupsURL = getUrls.addCupsURL;
    const removeGiftsURL = getUrls.removeGiftsURL;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    this.init = function (view) {
        myView = view;
    }

    this.updateState = function (hashPageName) {
        myView.renderContent(hashPageName);
    }

    this.isEmailValid = function (email) {
        return EMAIL_REGEXP.test(email);
    }

    this.isPasswordValid = function (password) {
        return PASS_REGEXP.test(password);
    }

    this.checkInputsReg = function (name, email, password) {
        if (name && this.isEmailValid(email) && this.isPasswordValid(password)) {
            myView.enableRegBtn();
        } else {
            myView.disableRegBtn();
        }
    }

    this.checkInputsLog = function (email, password) {
        if (email && password) {
            myView.enableLogBtn();
        } else {
            myView.disableLogBtn();
        }
    }

    this.checkEmail = function (email) {
        if (email === "") {
            myView.closeEmailErr();
        } else {
            if (!this.isEmailValid(email)) {
                myView.invalidEmail();
            } else if (this.isEmailValid(email)) {
                myView.closeEmailErr();
            }
        }
    }

    this.checkPassword = function (password) {
        if (password === "") {
            myView.closePassErr();
        } else {
            if (!this.isPasswordValid(password)) {
                myView.invalidPassword();
            } else if (this.isPasswordValid(password)) {
                myView.closePassErr();
            }
        }
    }

    this.getRole = async function () {
        let user = {
            email: sessionStorage.getItem('user_email'),
            token: sessionStorage.getItem('user_token')
        }
        let role = await this.sendRequest('POST', baseURL + roleURL, user);
        return role.role;
    }

    this.loadMenu = async function () {
        const snapshot = await get(child(ref(database), 'MenuList'));
        if (snapshot.exists()) {
            const drinks = snapshot.val();
            myView.renderMenu(drinks);
        }
    }

    this.sendRequest = function (method, url, body = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    resolve(JSON.parse(xhr.response));
                }
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            xhr.send(JSON.stringify(body));
        });
    }

    this.regUser = async function (email, password, name) {
        const user = {
            name: name,
            email: email,
            password: password
        }
        //ADD VALIDATION
        /**
         *  user = {
         *      name,
         *      token,
         *      gifts,
         *      cups,
         *      qrUrl,
         *  }
         */
        this.sendRequest('POST', baseURL + regURL, user)
            .then(async regUserResponse => {
                sessionStorage.setItem('user_token', regUserResponse.token);
                sessionStorage.setItem('user_email', regUserResponse.email);
                sessionStorage.setItem('user_qr_url', regUserResponse.qrUrl);
                sessionStorage.setItem('user_gifts', regUserResponse.gifts);
                sessionStorage.setItem('user_cups', regUserResponse.cups);
                let role = await this.getRole();
                //TODO вынести
                setCookie('token', regUserResponse.token, {expires: new Date() + 7});
                setCookie('email', regUserResponse.email, {expires: new Date() + 7});
                myView.successLog(role);
                setTimeout(() => {
                    myView.successReg();
                }, 1000);
                // setCookie('token', regUserResponse.token);
                // setCookie('email', regUserResponse.email);
            })
            .catch(() => myView.error('user is reg'));
            // .then(registeredUser => {
        // sessionStorage.setItem('user_token', regUserResponse.token);
        // sessionStorage.setItem('user_email', regUserResponse.email);
        // sessionStorage.setItem('user_qr_url', regUserResponse.qrUrl);
        // sessionStorage.setItem('user_gifts', regUserResponse.gifts);
        // sessionStorage.setItem('user_cups', regUserResponse.cups);
        // let role = await this.getRole();
        // //TODO вынести
        // setCookie('token', regUserResponse.token, {expires: new Date() + 7});
        // setCookie('email', regUserResponse.email, {expires: new Date() + 7});
        //         myView.successReg(regUserResponse);
        //         setCookie('token', regUserResponse.token);
        //         setCookie('email', regUserResponse.email);
        // myView.successLog(role);
                // myView.clo
            // })
            // .catch(err => myView.error("something went wrong"));
    }

    /**
     *  user = {
     *      name,
     *      token,
     *      gifts,
     *      cups,
     *      qrUrl,
     *  }
     */
    this.loginUser = function (email, password) {
        //ADD VALIDATION
        const user = {
            email: email,
            password: password
        }
        console.log("WE'RE TRYING TO SEND LOGIN " + email + password)
        this.sendRequest('POST', baseURL + loginURL, user)
            .then(async regUserResponse => {
                sessionStorage.setItem('user_token', regUserResponse.token);
                sessionStorage.setItem('user_email', regUserResponse.email);
                sessionStorage.setItem('user_qr_url', regUserResponse.qrUrl);
                sessionStorage.setItem('user_gifts', regUserResponse.gifts);
                sessionStorage.setItem('user_cups', regUserResponse.cups);
                let role = await this.getRole();
                //TODO вынести
                setCookie('token', regUserResponse.token, {expires: new Date() + 7});
                setCookie('email', regUserResponse.email, {expires: new Date() + 7});
                // sessionStorage.setItem('user_token', regUserResponse.token);
                // sessionStorage.setItem('user_email', regUserResponse.email);
                // sessionStorage.setItem('user_qr_link', regUserResponse.qrcode);

                myView.successLog(role);
            })
            .catch(err => myView.error('invalid credentials'));
        // if (regUserResponse.status === 500) {
        //     myView.error('user not found');
        // } else {
        //     sessionStorage.setItem('user_token', regUserResponse.token);
        //     sessionStorage.setItem('user_email', regUserResponse.email);
        //     sessionStorage.setItem('user_qr_url', regUserResponse.qrUrl);
        //     sessionStorage.setItem('user_gifts', regUserResponse.gifts);
        //     sessionStorage.setItem('user_cups', regUserResponse.cups);
        //     let role = await this.getRole();
        //     //TODO вынести
        //     setCookie('token', regUserResponse.token, {expires: new Date() + 7});
        //     setCookie('email', regUserResponse.email, {expires: new Date() + 7});
        //     // sessionStorage.setItem('user_token', regUserResponse.token);
        //     // sessionStorage.setItem('user_email', regUserResponse.email);
        //     // sessionStorage.setItem('user_qr_link', regUserResponse.qrcode);
        //
        //     myView.successLog(role);
        // }
    }

    this.manageUser = async function () {
        if (typeof getCookie('token') === undefined) {
            sessionStorage.clear()
            await myView.hideUser();
            return;
        }

        const token = getCookie('token');
        if (token) {
            if (!sessionStorage.getItem('user_token')) {
                let refUser = {
                    email: getCookie('email'),
                    token: getCookie('token')
                }
                let regUserResponse = await this.sendRequest('POST', baseURL + refreshURL, refUser);
                sessionStorage.setItem('user_token', regUserResponse.token);
                sessionStorage.setItem('user_email', regUserResponse.email);
                sessionStorage.setItem('user_qr_url', regUserResponse.qrUrl);
                sessionStorage.setItem('user_gifts', regUserResponse.gifts);
                sessionStorage.setItem('user_cups', regUserResponse.cups);
                console.log(`${regUserResponse.gifts} ${regUserResponse.cups}`);
                let role = await this.getRole();
                myView.successLog(role);
            } else {
                let refUser = {
                    email: getCookie('email'),
                    token: getCookie('token')
                }
                let regUserResponse = await this.sendRequest('POST', baseURL + refreshURL, refUser);
                if (sessionStorage.getItem('user_cups') != regUserResponse.cups || sessionStorage.getItem('user_gifts') != regUserResponse.gifts) {
                    sessionStorage.setItem('user_gifts', regUserResponse.gifts);
                    sessionStorage.setItem('user_cups', regUserResponse.cups);
                }
            }
            let role = await this.getRole();
            await myView.changePageUserIn(role);
        } else {
            sessionStorage.clear()
            await myView.hideUser();
        }
    }

    this.logoutUser = function () {
        // if (getCookie('token')) {
        //     deleteCookie('token');
        //     myView.hideUser();
        // }
        const logOutUser = {
            email: sessionStorage.getItem('user_email'),
            token: sessionStorage.getItem('user_token')
        }
        this.sendRequest('POST', baseURL + logOutURL, logOutUser)
            .then(isSuccess => {
                console.log(isSuccess)
            })
            .catch(err => myView.error("something went wrong"));
        deleteCookie('token');
        deleteCookie('email');
        myView.hideUser();
        sessionStorage.clear();
    }

    this.getQR = function () {

    }

    this.searchCookie = function () {
        let coks = getCookie('token');
        console.log(coks);
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

    this.goToAdminPage = function () {
        myView.goToAdminPage();
    }

    this.changeToReg = function () {
        myView.changeToReg();
    }

    this.changeToLog = function (value) {
        myView.changeToLog();
    }

    this.plusCupInput = function (value) {
        value += 1;
        myView.plusCupInput(value);
    }

    this.minusCupInput = function (value) {
        if (value > 1) {
            value -= 1;
            myView.minusCupInput(value);
        }
    }

    // this.signIn = function (email, password) {
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //
    //             update(ref(database, "UsersList/" + user.uid),
    //                 {
    //                     email: email,
    //                 })
    //             myView.successLog();
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             myView.errorAuth(errorCode);
    //         });
    // }
    //
    // this.signUp = function (email, password, name) {
    //     createUserWithEmailAndPassword(auth, email, password, name)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             set(ref(database, "UsersList/" + user.uid),
    //                 {
    //                     email: email,
    //                     name: name,
    //                     bonuses: 0,
    //                     record: 0,
    //                     winCups: 0,
    //                 })
    //             myView.successReg();
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             myView.errorAuth(errorCode);
    //         });
    // }
    //
    // this.logout = function () {
    //     signOut(auth).then(() => {
    //         myView.logout();
    //     }).catch((error) => {
    //         const errorCode = error.code;
    //         myView.error(errorCode);
    //     });
    // }


    // this.setCookie = function (name, value, options = { path: '/' }) {
    //     /*
    //     Sets a cookie with specified name (str), value (str) & options (dict)
    //
    //     options keys:
    //       - path (str) - URL, for which this cookie is available (must be absolute!)
    //       - domain (str) - domain, for which this cookie is available
    //       - expires (Date object) - expiration date&time of cookie
    //       - max-age (int) - cookie lifetime in seconds (alternative for expires option)
    //       - secure (bool) - if true, cookie will be available only for HTTPS.
    //                         IT CAN'T BE FALSE
    //       - samesite (str) - XSRF protection setting.
    //                          Can be strict or lax
    //                          Read https://web.dev/samesite-cookies-explained/ for details
    //       - httpOnly (bool) - if true, cookie won't be available for using in JavaScript
    //                           IT CAN'T BE FALSE
    //     */
    //     if (options.expires instanceof Date) {
    //         options.expires = options.expires.toUTCString();
    //     }
    //
    //     if (value instanceof Object) {
    //         value = JSON.stringify(value);
    //     }
    //
    //     let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    //     for (let optionKey in options) {
    //         updatedCookie += "; " + optionKey;
    //         if (options[optionKey] !== true) {
    //             updatedCookie += "=" + options[optionKey];
    //         }
    //     }
    //     document.cookie = updatedCookie;
    // }

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
        this.sendRequest('GET', url)
            .then(user => myView.showBonuses(user))
            .catch(err => console.log(err));
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

    this.openCode = function () {
        myView.openCode();
    }

    this.closeCode = function () {
        myView.closeCode();
    }

    let scannedUser = null;
    this.scannerQR = async function () {
        myView.closeScanBtn();
        const html5QrCode = new Html5Qrcode("reader");
        console.log("IN SCANNER BEFORE CALLBACK")
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            html5QrCode.stop().then(async (ignore) => {
                // QR Code scanning is stopped.
                console.log(decodedText);
                let admin = {
                    email: getCookie('email'),
                    token: getCookie('token')
                };
                const requestUrl = baseURL + adminQrURL + decodedText;
                console.log(admin.email);
                console.log(admin.token);
                console.log(requestUrl);
                const scannedUser = await this.sendRequest('POST', baseURL + adminQrURL + decodedText, admin);
                // .then(scannedUser => myView.openAdminBtns(scannedUser))
                // .catch(err => alert("User is not found"));
                console.log('SCANNED USER ALREADY FROM BACK' + scannedUser)
                sessionStorage.setItem('scanned_user_email', scannedUser.email);
                sessionStorage.setItem('scanned_user_name', scannedUser.name);
                myView.openAdminBtns(scannedUser);
                console.log(scannedUser);

            }).catch((err) => {
                console.log("INSIDE CATCH SOME ERROR SCANNER" + err);
                // console.log(.error);
                // Stop 3, handle it.
            });

        };
        const config = {fps: 10, qrbox: {width: 300, height: 300}};
// If you want to prefer back camera
        html5QrCode.start({facingMode: "environment"}, config, await qrCodeSuccessCallback);
//
// // Select front camera or fail with `OverconstrainedError`.
//         html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);
//
// // Select back camera or fail with `OverconstrainedError`.
//         html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
    }

    this.addCupsAdmin = async function (count) {
        console.log("WE ARE IN PROBLEM PLACE")
        console.log(sessionStorage.getItem('user_email'));
        console.log(sessionStorage.getItem('user_token'));
        console.log(sessionStorage.getItem('scanned_user_email'));
        console.log(sessionStorage.getItem('scanned_user_name'));
        let bonusAdd = {
            adminEmail: sessionStorage.getItem('user_email'),
            adminToken: sessionStorage.getItem('user_token'),
            email: sessionStorage.getItem('scanned_user_email'),
            name: sessionStorage.getItem('scanned_user_name'),
            count: count
        }
        const updatedUser = await this.sendRequest('POST', baseURL + addCupsURL, bonusAdd);
        myView.closeAdminBtns(updatedUser);
        // .then(scanned_user_name => myView.closeAdminBtns())
        // .catch(err => alert("User is not found"));
    }

    this.removeGiftsAdmin = async function (count) {
        let bonusRemove = {
            adminEmail: sessionStorage.getItem('user_email'),
            adminToken: sessionStorage.getItem('user_token'),
            email: sessionStorage.getItem('scanned_user_email'),
            name: sessionStorage.getItem('scanned_user_name'),
            count: count
        }
        const updatedUser = await this.sendRequest('POST', baseURL + removeGiftsURL, bonusRemove);
        // myView.updateAdminBtnsCount(updatedUser);
        myView.closeAdminBtns(updatedUser);
    }

    this.formatTime = function (ms) {
        return Number.parseFloat(ms / 1000).toFixed(2);
    }

    //TODO check record before, fix 1 game late
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

            setTimeout(async () => {
                gameIsStarted = false;
                clearInterval(interval);
                if (clicks > 300) {
                    myView.heyCheater();
                }
                if (clicks <= 300) {
                    if (clicks === 300) {
                        console.log("Traktorist is on the way")
                    }

                    let clickerRequest = {
                        email: sessionStorage.getItem('user_email'),
                        score: clicks,
                        token: sessionStorage.getItem('user_token')
                    };
                    myView.disableClickerButton();
                    await this.sendRequest('POST', baseURL + "/clicker/finish", clickerRequest)
                        .then(clickResponse => {
                            sessionStorage.setItem('user_record', clickResponse);
                            clicks = 0;
                            myView.showClickerRecord();
                        });
                }
                myView.enableClickerButton();
            }, timeOut);
        }
    }

}

export default myModel;