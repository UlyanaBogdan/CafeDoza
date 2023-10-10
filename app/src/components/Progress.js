const Progress = {
    render: () => {
        return `
        <section class="my-cabinet">
            <div class="modal-coffee closed animate__animated animate__flipInX animate__slow">
                <p>♥</p>
                <img src="./img/cupmodal.svg" class="modalplus-img">
                <h3 class="lng">+1 cup!</h3>
            </div>
            <div class="modal-congratulations closed animate__animated animate__flipInX animate__slow">
                <p class="lng">Hooray!</p>
                <img src="./img/bonus_1.svg" class="modalplus-img">
                <h3 class="lng">bonus!</h3>
            </div>
<!--            <div class="code-input-block">-->
<!--                <input type="text" class="code-input" placeholder="your code">-->
<!--                <button type="button" class="search-btn"><img src="./img/plusAuth.svg"></button>-->
<!--            </div>-->
            <h2 class="bonuses-greeting animate__animated animate__pulse animate__slow lng">My Bonuses</h2>
<!--            <button class="check-bonuses-btn lng">Check bonuses!</button>-->
            <div class="QR-block"><img class="qr-user" src="" width="150"></div>
            <div class="QR-open closed wow animate__zoomIn"><img class="open-qr-user" src="" width="600"></div>
            <div class="progress-bar"><span class="cup-progress"></span></div>
            <div class="have-bonuses animate__animated animate__pulse animate__slow animate__infinite">
                <img class="bonus-number-img" src="./img/gift.svg">
                <p class="bonus-number"></p>
            </div>
        </section>
        `;
    }
}

export default Progress;