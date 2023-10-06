import ErrorModal from "../components/ErrorModal.js";
import Header from "../components/Header.js";
import ModalAuth from "../components/ModalAuth.js";
import Menu from "../components/Menu.js";
import Footer from "../components/Footer.js";

const MenuPage = {
    id: "drinklist",
    title: "Our menu",
    render: () => {
        return `
        ${ErrorModal.render()}
        ${Header.render()}
        ${ModalAuth.render()}
        ${Menu.render()}
        ${Footer.render()}
       `;
    }
}

export default MenuPage;