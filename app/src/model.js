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
    let registeredUser = null;
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
        console.log("we are in registration");
        console.log(baseURL);
        console.log(regURL);
        await this.sendRequest('POST', baseURL + regURL, user)
            .then(registeredUser => {
                myView.successReg(registeredUser);
                setCookie('token', registeredUser.token);
                setCookie('email', registeredUser.email);
            })
            .catch(err => myView.error("something went wrong"));
        return registeredUser;
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
    this.loginUser = async function (email, password, registeredUser) {
        console.log("WE ARE IN LOGIN")
        //ADD VALIDATION
        const user = {
            email: email,
            password: password
        }
        await this.sendRequest('POST', baseURL + loginURL, user)
            .then(regUserResponse => {
                myView.successLog(regUserResponse);
                setCookie('token', regUserResponse.token);
                setCookie('email', regUserResponse.email);
                registeredUser = regUserResponse;
                // sessionStorage.setItem('user_token', regUserResponse.token);
                // sessionStorage.setItem('user_email', regUserResponse.email);
                // sessionStorage.setItem('user_qr_link', regUserResponse.qrcode);
            })
            .catch(err => myView.error("user not found"));
        console.log('user gifts ' + registeredUser.gifts);
        sessionStorage.setItem('user_token', registeredUser.token);
        sessionStorage.setItem('user_email', registeredUser.email);
        sessionStorage.setItem('user_qr_url', registeredUser.qrUrl);
        sessionStorage.setItem('user_gifts', registeredUser.gifts);
        sessionStorage.setItem('user_cups', registeredUser.cups);

        console.log('we are out of then and regUser is ' + registeredUser)
    }

    this.manageUser = async function (regUser) {
        const token = getCookie('token');

        if (token) {
            if (!sessionStorage.getItem('token')) {
                let refUser = {
                    email: getCookie('email'),
                    token: getCookie('token')
                }
                await this.sendRequest('POST', baseURL + refreshURL, refUser)
                    .then(regUserResponse => {
                        myView.successLog(regUserResponse);
                        sessionStorage.setItem('user_token', regUserResponse.token);
                        sessionStorage.setItem('user_email', regUserResponse.email);
                        sessionStorage.setItem('user_qr_url', regUserResponse.qrUrl);
                        sessionStorage.setItem('user_gifts', regUserResponse.gifts);
                        sessionStorage.setItem('user_cups', regUserResponse.cups);
                    })
                    .catch(err => myView.error("user not found"));

            }
            await myView.changePageUserIn(regUser);
        } else {
            sessionStorage.clear()
            await myView.hideUser();
        }
        return registeredUser;
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
    this.scannerQR = function () {
        myView.closeScanBtn();
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            html5QrCode.stop().then(async (ignore) => {
                // QR Code scanning is stopped.
                console.log(decodedText);
                let admin = {
                    email: sessionStorage.getItem('user_email'),
                    token: sessionStorage.getItem('user_token')
                };
                this.sendRequest('POST', baseURL + adminQrURL + decodedText, admin)
                    .then(scannedUser => myView.openAdminBtns(scannedUser))
                    .catch(err => alert("User is not found"));

            }).catch((err) => {
                // console.log(.error);
                // Stop 3, handle it.
            });

        };
        const config = {fps: 10, qrbox: {width: 250, height: 250}};
// If you want to prefer back camera
        html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccessCallback);
//
// // Select front camera or fail with `OverconstrainedError`.
//         html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);
//
// // Select back camera or fail with `OverconstrainedError`.
//         html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
    }

    this.addCupsAdmin = function () {
        const newCups = Number(scannedUser.cups) + 1;
        this.sendRequest('POST', baseURL + "", newCups)
            .then(scannedUser => myView.closeAdminBtns())
            .catch(err => alert("User is not found"));
    }

    this.removeCupsAdmin = function () {
        const newGifts = Number(scannedUser.gifts) - 1;
        this.sendRequest('POST', baseURL + "", newGifts)
            .then(scannedUser => myView.closeAdminBtns())
            .catch(err => alert("User is not found"));

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
                if (clicks > 300) {
                    myView.heyCheater();
                }
                gameIsStarted = false;
                if (clicks <= 300) {
                    if (clicks === 300) {
                        console.log("Traktorist is on the way")
                    }

                    let clickerRequest = {
                        email: sessionStorage.getItem('user_email'),
                        score: clicks,
                        token: sessionStorage.getItem('user_token')
                    };
                    this.sendRequest('POST', baseURL + "/clicker/finish", clickerRequest)
                        .then(clickResponse => {
                            sessionStorage.setItem('user_record', clickResponse);
                            clicks = clickResponse;
                        });
                }
                myView.endGame();
            }, timeOut);
        }
    }

}

export default myModel;