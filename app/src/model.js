// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// import { getDatabase, ref, set, push, child, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     signOut
// } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

import {getUrls} from "./config.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDFgq_UWYWiocaTjAnEr8VH22RLEZFHKZ0",
//     authDomain: "coffeedoza-73a9f.firebaseapp.com",
//     projectId: "coffeedoza-73a9f",
//     storageBucket: "coffeedoza-73a9f.appspot.com",
//     messagingSenderId: "606035213686",
//     appId: "1:606035213686:web:27f59fd0a89fb457418e57",
//     databaseURL: "https://coffeedoza-73a9f-default-rtdb.europe-west1.firebasedatabase.app"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth();

function myModel() {
    let myView = null;
    let clicks = 0;
    let timeOut = 5000;
    let gameIsStarted = false;
    const baseURL = getUrls.baseURL;

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

    this.sendRequest = function (method, url, body = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json')

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

    this.sendRequest('GET', baseURL + "/ulyana/check")
        .then(user => myView.addBack(user))
        .catch(err => console.log(err));

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
        this.sendRequest('GET', baseURL + "/ulyana/check")
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

    // const scanner = new Html5QrcodeScanner('reader', {
    //     qrbox: {
    //         width: 250,
    //         height: 250,
    //     },
    //     fps: 20,
    // });
    //
    //
    // scanner.render(success, error);
    //
    // function success(result) {
    //     myView.showResult(result, this.scanner);
    // }


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
                if (clicks > 100) {
                    myView.heyCheater();
                }
                gameIsStarted = false;
                const uid = auth.currentUser.uid;
                get(child(ref(database), "UsersList/" + uid))
                    .then(snapshot => {
                        const user = snapshot.val();
                        if (user.record < clicks && clicks <= 100) {
                            user.record = clicks;
                            update(ref(database, "UsersList/" + uid), user);
                        }
                    })
            }, timeOut);
        }
    }

}

export default myModel;