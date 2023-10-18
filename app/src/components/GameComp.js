const GameComp = {
    render: () => {
        return `
            <section class="game">
              <h2 class="lng">Play the clicker!</h2>
              <p class="clicker-loader closed"></p>
              <p class="game-header lng">Tap the logo to start!</p>
              <p class="clicks lng"></p>
              <button class="click-btn" id="click-btn"><img src="https://i.postimg.cc/WzTxx2Wy/logo.png"></button>
            </section>
            `;
    }
}

export default GameComp;