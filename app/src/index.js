import Header from "./components/Header.js";
import AdminCabinet from "./components/AdminCabinet.js";
import CoffeeShops from "./components/CoffeeShops.js";
import DrinkDiv from "./components/DrinkDiv.js";
import ErrorModal from "./components/ErrorModal.js";
import GameComp from "./components/GameComp.js";
import Main from "./components/Main.js";
import Map from "./components/Map.js";
import Menu from "./components/Menu.js";
import ModalAuth from "./components/ModalAuth.js";
import Progress from "./components/Progress.js";
import Footer from "./components/Footer.js";
import AdminPage from "./pages/AdminPage.js";
import HomePage from "./pages/HomePage.js";
import MenuPage from "./pages/MenuPage.js";
import MyBonuses from "./pages/MyBonuses.js";
import myView from "./view.js";
import myController from "./controller.js";
import myModel from "./model.js";


const components = {
    header: Header,
    modalAuth: ModalAuth,
    main: Main,
    coffeeShops: CoffeeShops,
    map: Map,
    menu: Menu,
    myProgress: Progress,
    game: GameComp,
    admin: AdminCabinet,
    footer: Footer,
};

const routes = {
    main: HomePage,
    drinklist: MenuPage,
    bonuses: MyBonuses,
    adminpage: AdminPage,
    default: HomePage,
};

const mySPA = (function() {
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
}());  //самовызываюш функция ,которая сразу же вызывается ,возвращает два метода(инит и рендер)

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init({
    container: "app",
    routes: routes,
    components: components,
}));







