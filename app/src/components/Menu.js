const Menu = {
    render: () => {
        return `
        <section class="menu-section">
          <h2 class="lng">Our menu</h2>
          <div class="search-menu-div">
            <input type="text" placeholder="Search" class="search-input">
            <button class="clear-search-btn"><img src="./img/plusAuth.svg"></button>
          </div>
          <div class="menu-container">
          </div>
        </section>
        `;
    }
}

export default Menu;