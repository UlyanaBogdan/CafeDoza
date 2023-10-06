import ErrorModal from "../components/ErrorModal.js";
import Header from "../components/Header.js";
import AdminCabinet from "../components/AdminCabinet.js";
import ModalAuth from "../components/ModalAuth.js";
import Footer from "../components/Footer.js";

const AdminPage = {
    id: "admin",
    title: "Admin",
    render: () => {
        return `
        ${ErrorModal.render()}
        ${Header.render()}
        ${AdminCabinet.render()}
        ${ModalAuth.render()}
        ${Footer.render()}
       `;
    }
}

export default AdminPage;