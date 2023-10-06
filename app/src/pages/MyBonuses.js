import ErrorModal from "../components/ErrorModal.js";
import Header from "../components/Header.js";
import ModalAuth from "../components/ModalAuth.js";
import Progress from "../components/Progress.js";
import GameComp from "../components/GameComp.js";
import Footer from "../components/Footer.js";

const MyBonuses = {
    id: "bonuses",
    title: "My bonuses",
    render: () => {
        return `
        ${ErrorModal.render()}
        ${Header.render()}
        ${ModalAuth.render()}
        ${Progress.render()}
        ${GameComp.render()}
        ${Footer.render()}
       `;
    }
}

export default MyBonuses;