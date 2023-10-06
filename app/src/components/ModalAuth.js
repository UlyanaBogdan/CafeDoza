const ModalAuth = {
    render: () => {
        return `
        <div class="closed modal-overlay"></div>
        <div class="closed auth-modal" >
          <button type="button" class="close-auth"><img src="./img/plusAuth.svg" class="plus-auth-img"></button>
          <h3 class="first-time-text closed lng-firsttimegreet">Hi, first time here?</h3>
          <h3 class="hi-again-text lng">Hi again!</h3>
          <input type="text" class="name-input reg-part closed" placeholder="Name" autocomplete="on">
          <input type="email" class="email-input" placeholder="Email" autocomplete="on" autofocus>
          <input type="password" class="input-password" placeholder="Password">
          <div class="error-auth"></div>
          <button type="button" class="reg-btn reg-part closed lng">sign up</button>
          <button type="button" class="log-btn log-part lng">sign in</button>
          <button type="button" class="have-acc reg-part closed lng">Already have an account?</button>
          <button type="button" class="new-here log-part lng">New here?</button>
        </div>
        <div class="successful-reg-modal closed">
          <h3 class="lng">Congratulations!<br>Successful registration!<br>♥</h3>
        </div>
        `;
    }
}

export default ModalAuth;