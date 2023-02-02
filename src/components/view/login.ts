export function renderLoginForm() {
    return `
    <form class="form-auth" action="#" method="post">
        <h2>Login to Task manager</h2>
        <input type="email" name="login-auth" placeholder="Enter login" required >
        <input type="password" name="pass-auth" placeholder="Enter password" required >
        <button class="button-auth" type="submit" name="submit-auth">Log in</button>
        <p>or</p>
        <a href="/auth?type=signup">Register accaunt</a>
    </form>`;
}
