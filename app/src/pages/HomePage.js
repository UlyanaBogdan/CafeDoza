import ErrorModal from "../components/ErrorModal.js";
import Header from "../components/Header.js";
import ModalAuth from "../components/ModalAuth.js";
import Main from "../components/Main.js";
import CoffeeShops from "../components/CoffeeShops.js";
import Map from "../components/Map.js";
import Footer from "../components/Footer.js";

const HomePage = {
    id: "main",
    title: "Cafe DOZA",
    render: () => {
        return `
        ${ErrorModal.render()}
        ${Header.render()}
        ${ModalAuth.render()}
        ${Main.render()}
        ${CoffeeShops.render()}
        ${Map.render()}
        ${Footer.render()}
       `;
    }
}

export default HomePage;