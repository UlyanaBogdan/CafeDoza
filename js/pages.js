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
        ${Footer.render()}
       `;
    }
};

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
};

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
};