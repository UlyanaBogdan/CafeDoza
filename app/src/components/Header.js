const Header = {
    render: () => {
        return `
        <div class="menu-header">
          <div class="div-menu">
            <img src="https://i.postimg.cc/6p97KrsH/coffeecup-114302.png" class="coffee-icon">
            <img src="https://i.postimg.cc/5NYcQKhH/Plus-Symbol-Vector-PNG-Picture-1-1.png" class="plus">
          </div>
          <div class="closed open-menu">
            <div class="navigation-block">
              <ul class="navigation">
                <li class="lng-aboutus">About us</li>
                <li><a href="#main" class="lng-main link-menu">Main</a></li>
              </ul>
              <ul class="navigation closed mybonuses">
                <li class="lng-you">You</li>
                <li><a href="#bonuses" class="lng-bonuses link-menu">My bonuses</a></li>
              </ul>
              <ul class="navigation closed admin">
                <li class="lng-you">Admin</li>
                <li><a href="#adminpage" class="lng-bonuses link-menu">Admin Page</a></li>
              </ul>
              <ul class="navigation">
                <li class="lng-wannatry">Wanna try?</li>
                <li><a href="#drinklist" class="lng-menu link-menu">Menu</a></li>
              </ul>
            </div>
            <button class="login-btn lng-login">Log in/Sign Up</button>
            <button class="closed logout-btn lng-logout">Log Out</button>
            <div class="line"></div>
            <p class="copyright">2023 &copy; CAFE DOZA, INC.</p>
          </div>
        </div>
        `;
    }
}

export default Header;