const ModalAuth = {
    render: () => {
        return `
        <div class="closed modal-overlay"></div>
        <div class="closed auth-modal">
          <button type="button" class="close-auth"><img src="./img/plusAuth.svg" class="plus-auth-img"></button>
          <h3 class="first-time-text closed lng-firsttimegreet">Hi, first time here?</h3>
          <h3 class="hi-again-text lng">Hi again!</h3>
          <input type="text" class="name-input reg-part closed" placeholder="Name" autocomplete="on">
          <input type="email" class="email-input" placeholder="Email" autocomplete="on" autofocus>
          <div class="error-email"></div>
          <input type="password" class="input-password" placeholder="Password">
          <div class="error-password"></div>
          <button type="button" class="reg-btn reg-part closed lng">sign up</button>
          <button type="button" class="log-btn log-part lng">sign in</button>
          <button type="button" class="have-acc reg-part closed lng">Already have an account?</button>
          <button type="button" class="new-here log-part lng">New here?</button>
          <button type="button" class="google-signin">
          <div class="google-signin"><div id="g_id_onload"
             data-client_id="1072002311281-avq0c6im5urd2avgor0h57437ogdoidq.apps.googleusercontent.com"
             data-context="signin"
             data-ux_mode="popup"
             data-login_uri="http://localhost:63343"
             data-auto_select="true"
             data-itp_support="true">
          </div>

            <div class="g_id_signin"
                 data-type="standard"
                 data-shape="rectangular"
                 data-theme="filled_black"
                 data-text="continue_with"
                 data-size="medium"
                 data-locale="en-US"
                 data-logo_alignment="left">
            </div>
</button>
        </div>
        <div class="successful-reg-modal closed">
          <h3 class="lng">Congratulations!<br>Successful registration!<br>♥</h3>
        </div>
        `;
    }
}

export default ModalAuth;