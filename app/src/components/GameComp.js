const GameComp = {
    render: () => {
        return `
            <section class="game">
              <h2 class="lng">Play the clicker!</h2>
              <p class="game-header lng">Tap the logo to start!</p>
              <p class="clicks lng"></p>
              <button class="click-btn"><img src="./img/logo.png"></button>
            </section>
            `;
    }
}

export default GameComp;